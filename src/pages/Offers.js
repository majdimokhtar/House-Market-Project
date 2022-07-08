import {useEffect,useState} from 'react'
import { collection,getDocs,query,where,orderBy,limit,startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

export default function Offers() {
    const [listings,setListings] =useState(null)
    const [loading,setLoading]=useState(true)
    const [lastFetchedListing,setLastFetchedListing] =useState(null)

    useEffect(() => {
        const fetchListings = async()=>{
            try {
                // get reference
                const listingRef = collection(db ,"listings")
                // create a query
                const q = query (listingRef , where("offer","==",true),
                orderBy("timestamp","desc"),
                limit(10)
                )
                // excute query
                const querySnap = await getDocs(q)
                const lastVisible =querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)
                const listings =[]
                querySnap.forEach((doc)=>{
                    return listings.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error("Could Not Fetch Listings")
            }
        }
        fetchListings()
    }, [])




    // pagination load more
    const onFetchMoreListing = async()=>{
        try {
            // get reference
            const listingRef = collection(db ,"listings")
            // create a query
            const q = query (listingRef , where("offer","==",true),
            orderBy("timestamp","desc"),
            startAfter(lastFetchedListing),
            limit(10)
            )
            // excute query
            const querySnap = await getDocs(q)
            const lastVisible =querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)
            const listings =[]
            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListings((prevState)=>[...prevState,...listings])
            setLoading(false)
        } catch (error) {
            toast.error("Could Not Fetch Listings")
        }
    }
    
  return (
    <div className='category'>
    <header>
    <p className='pageHeader'>
     Offers
    </p>
    </header>
    {loading ? (<Spinner/>) : listings && listings.length>0 ?
    (<>
    <main>
        <ul className='categoryListings'>
            {listings && listings.map((listing)=>(
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
            ))}
        </ul>
    </main>
    <br />
    <br />
    {lastFetchedListing && (
        <p className='loadMore' onClick={onFetchMoreListing}>
        Load More
        </p>
    )}
    </>) : (<p> There are No current Offers</p>)
    }
    </div>
  )
}
