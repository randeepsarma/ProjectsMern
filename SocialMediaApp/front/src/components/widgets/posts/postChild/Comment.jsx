import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pic from "../../../../images/dp.jpg"
import { BsHeartFill, BsHeart } from "react-icons/bs"
import { CommentContent } from 'components/widgets/commentsWidget/CommentContent'

const Comment = () => {



  const navigate = useNavigate()
  return (
    <Fragment>
      <CommentContent />
    </Fragment>
  )
}

export default Comment