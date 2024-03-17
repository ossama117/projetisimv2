import React from 'react'
import "../style/Presentation.css"
import imageD from "../../public/img3.jpg"



export default function Presentation() {
  return (
    <div>
            <div className="prentdiv">  
                <img className="sousi" src={imageD} width="5500px"  height="400px"/>
                 <p className='para_prese'><h2 className="stitre">historique de ISIM:</h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas provident repudiandae, maiores labore asperiores fuga, ipsam cupiditate illo porro dignissimos neque magnam ratione architecto officia delectus modi? Odit, fuga velit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dignissimos, cupiditate veniam nulla expedita ea dolorum tenetur, rem, omnis quia accusantium! Maxime, odit. Rem amet excepturi, quod animi quaerat blanditiis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis aperiam similique ipsam dolores maiores perferendis sunt ducimus ad veniam, deleniti obcaecati, magnam in velit ex sint dolorem est dignissimos quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam corporis porro nesciunt </p>
            </div>
            <div className='vid_pres'>
            <iframe width="1000" height="500" src="https://www.youtube.com/embed/VkLe-ZETP3M?si=D2VTce6PA8lBL17f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
  )
}
