import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as DeleteIcon} from "../assets/svg/deleteIcon.svg"
import {ReactComponent as EditIcon} from "../assets/svg/editIcon.svg"
import bedIcon from "../assets/svg/bedIcon.svg"
import bathtubIcon from "../assets/svg/bathtubIcon.svg"


export default function ListingItem({listing,id,onDelete,onEdit}) {
  return (
    <li className='categoryListing'>
      <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink" >
        <img src={listing.imageUrls[0]} alt={listing.name} className="categoryListingImg"/>
        <div className="categoryListingDetails">
          <p className='categoryListingLocation'>
            {listing.location}
          </p>
          <p className='categoryListingName'>
            {listing.name}
          </p>
          <p className='categoryListingPrice'>
            {/* regular expression for the price */}
            {listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } DT
            {/* if listing type for rent U show per month */}
            {listing.type === "rent" && " /Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="" />
            <p className='categoryListingInfoText'>
              {listing.bedroom>1 ? `${listing.bedroom} Bedrooms`  : "one Bedroom"}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p className='categoryListingInfoText'>
              {listing.bathrooms>1 ? `${listing.bathrooms} Bathrooms`  : "one Bathroom"}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon className="removeIcon" fill="#e63946" onClick={()=>onDelete(listing.id,listing.name)} />
      )}
      {onEdit && (
        <EditIcon className='editIcon' onClick={()=>onEdit(id)}/>
      )}
    </li>
  )
}
