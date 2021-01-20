import React from "react";
import Hero from "./Hero";

export default function HeroHeader({ mainText, useStyle }) {
  return (
    <section className="hero is-fullheight" style={useStyle}>
      <div className="hero-head">
        <div className="container"></div>
      </div>
      <Hero mainText={mainText} />
    </section>
  );
}
