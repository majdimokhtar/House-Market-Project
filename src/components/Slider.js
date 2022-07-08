import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {collection ,getDocs,query,orderBy,limit} from "firebase/firestore"
import {db} from "../firebase.config"
import SwiperCore,{ Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.min.css'
import Spinner from './Spinner'
SwiperCore.use([Navigation,Pagination,Scrollbar,A11y,Autoplay])

export default function Slider() {
    const [loading,setLoading]=useState(true)
    const [listings,setListings]=useState(null)
    const navigate =useNavigate()
    useEffect(()=>{
        const fetchListings =async ()=>{
            const listingsRef =collection(db,"listings")
            const q = query(listingsRef,orderBy("timestamp",'desc'),limit(5))
            const querySnap = await getDocs(q)
            let listings =[]
            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchListings()
    },[])
    if (loading) {
        return <Spinner/>
    }
    if (listings.length===0){
     return <></>
    }
  return (listings &&(
    <>
    <p className='exploreHeading'>Recomended</p>
    <Swiper 
    slidesPerView={1} pagination={{clickable:true}}
    // loop={true}
    // autoplay={{
    // delay: 2000,
    // disableOnInteraction: false,
    // }}
    >
        {listings.map(({data,id})=>(
         <SwiperSlide key={id} onClick={()=>{navigate(`/category/${data.type}/${id}`)}}>
            <div className='swiperSlideDiv'
            style={{background:`url(${data.imageUrls[0]})
            center no-repeat`,
            backgroundSize:"cover"
        }}>
            <p className='swiperSlideText'>
                {data.name}
            </p>
            <p className='swiperSlidePrice'>
                {/* if it s null we show the regular price ?? */}
             {data.disccountedPrice ?? data.regularPrice} DT
             {" "}
             {data.type === "rent" && "/ Month"  }
            </p>
            </div>
         </SwiperSlide>
        ))}
    </Swiper>
    </>
  )

  )
}
