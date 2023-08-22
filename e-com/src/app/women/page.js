"use client"
import List from '@/components/List/List'
import MobileSearchBox from '@/components/MobileSearchBar/MobileSearchBox';
import MenPage from '@/components/men/MenPage';
import React, { useState } from 'react'

const Page = () => {
  
  return (
    <>
    <MobileSearchBox/>
    <MenPage heading="Women's Section"/>
    </>
  );
}

export default Page