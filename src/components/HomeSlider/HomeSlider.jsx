import React from 'react'
import Slider from 'react-slick'
import img1 from '../../assets/images/61cSNgtEISL._AC_SY200_.jpg'
import img2 from '../../assets/images/41nN4nvKaAL._AC_SY200_.jpg'
import img3 from '../../assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img4 from '../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img5 from '../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'


export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
  return (
    <>
    <div className="py-10 lg:flex lg:flex-row justify-center sm:flex-col">
            <div className="lg:w-1/5 sm:w-full">
                    <div>
                        <Slider {...settings}>
                                <img src={img1} alt="" className="w-full h-[400px]" />
                                <img src={img2} alt="" className="w-full h-[400px]" />
                                <img src={img3} alt="" className="w-full h-[400px]" />
                        </Slider>
                    </div>
            </div>
        <div className="lg:w-1/5 sm:w-full">
            <div>
                <img src={img4} className='w-full' alt="" />
                <img src={img5} className='w-full' alt="" />
            </div>
        </div>
</div>


    </>
  )
}











