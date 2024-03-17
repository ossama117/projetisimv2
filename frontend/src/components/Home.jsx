import React from "react";
import { Formation, Statistique } from "../data";
import stagiaires from "../assets/stagiaires.png";
import diplome from "../assets/diplome.png";
import secteur from "../assets/secteur.png";
import nv_fomation from "../assets/nv_fomation.png";
import "../style/Home.css";
import { useSpring, animated } from "react-spring";
import ImageSlider from "./ImageSlider";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}
const slides = [
  { url: "img1.jpg", title: "beach" },
  { url: "img2.jpg", title: "boat" },
  { url: "img3.jpg", title: "forest" },
];
const containerStyles = {
  // width: "700px",
  // height: "300px",
  // // margin: "0 auto",
};

export default function Home() {
  return (
    <>
      <div>
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>
      </div>
      <div className="stats">
        <div className="secteur">
          <img src={secteur} alt="" width="60px" height="50px" />
          <h1>
            <Number n={Statistique.secteurs} />
          </h1>
          <h3>Secteurs</h3>
        </div>
        <div className="Statistique">
          <img src={diplome} alt="" width="60px" height="60px" />
          <h1>
            <Number n={Statistique.formation_dip} />
          </h1>
          <h3>Formation diplômantes</h3>
        </div>
        <div className="stagiaires">
          <img src={stagiaires} alt="" width="70px" height="50px" />
          <h1>
            <Number n={Statistique.stagiaires} />
          </h1>
          <h3>Stagiaires en formation</h3>
        </div>
        <div className="niveau">
          <img src={nv_fomation} alt="" width="70px" height="50px" />
          <h1>
            <Number n={Statistique.niv_fromation} />
          </h1>
          <h3>Stagiaires en formation</h3>
        </div>
      </div>
      <h1 className="h1">Formatios diplômantes:</h1>
      <div className="foramtion">
        <div className="card">
          <h2>TECHNICIEN SPECIALISE</h2>
          <ul>
            {Formation.tech_sp.map((value) => (
              <li>
                <a href="https://www.myway.ac.ma/ar/filieres" target="blank">
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2>TECHNICIEN</h2>
          <ul>
            {Formation.tech.map((value) => (
              <li>
                <a href="https://www.myway.ac.ma/ar/filieres" target="blank">
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2>qualifiante</h2>
          <ul>
            {Formation.qualifiante.map((value) => (
              <li>
                <a href="https://www.myway.ac.ma/ar/filieres" target="blank">
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1 className="title_p">
        Les Plaformes De Formation <span>HYBRIDE</span>
      </h1>
      <section className="houss">
        <div>
          <h1 className="title_vid">ScholarVox:</h1>
          <div className="hous1">
            <iframe
             
              src="https://www.youtube.com/embed/pGaoJ-BEaNI?si=Bfv76rzo40Jv9txl"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              className="namevid"
            ></iframe>
          </div>
          <div>
            <h1 className="title_vid">OFPPT Langues:</h1>
            <iframe
              src="https://www.youtube.com/embed/0ccmuHFVY5U?si=gZqxB7521uCFX6mW"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="hous2">
          <div>
            <h1 className="title_vid">OFPPT Academy:</h1>
            <iframe
              src="https://www.youtube.com/embed/4VkojVKH6xU?si=a2OvMuwHn35YqrqB"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <h1 className="title_vid">My Way :</h1>
            <iframe

              src="https://www.youtube.com/embed/pNSRdhTuSSs?si=ep1zNDuzi92Ncn20"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
