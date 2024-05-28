import mhIMG from "../../assets/carousel/h6.jpg";

export default function MobileHero() {
  return (
    <>
      <div className="hero-mobile d-md-block d-lg-none">
        <img src={mhIMG} alt="mobile background d-none" />
      </div>
    </>
  );
}
