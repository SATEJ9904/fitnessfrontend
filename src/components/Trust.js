import React from "react";

const TrustedRecommendations = () => { const panelStyle = { background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(240,249,255,0.7))", padding: "2rem", marginBottom: "2rem", borderRadius: "20px", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", border: "1px solid rgba(255, 255, 255, 0.4)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", };

return ( <div style={{ maxWidth: "1000px", margin: "3rem auto", padding: "2rem", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", color: "#1e293b",overflow:"auto" }} > <h1 style={{ textAlign: "center", fontSize: "2.5rem", background: "linear-gradient(to right, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1.5rem", }} > Trusted. Personalized. Backed by Science. </h1>

<p style={{ textAlign: "center", fontSize: "1.2rem", color: "#334155" }}>
    Our diet and workout recommendations are built using global and Indian
    health standards so that your wellness journey is safe, effective, and
    tailor-made for you.
  </p>

  <div style={panelStyle}>
    <h2 style={{ textAlign: "center", color: "#3b0764" }}>
      Indian Health Institutions
    </h2>
    <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
      <li>
        <a href="https://main.mohfw.gov.in/" target="_blank" rel="noreferrer">
          Ministry of Health and Family Welfare, India
        </a>{" "}
        – Promotes BMI-based fitness planning to prevent lifestyle diseases.
      </li>
      <li>
        <a href="https://www.nin.res.in/" target="_blank" rel="noreferrer">
          National Institute of Nutrition (NIN)
        </a>{" "}
        – Provides dietary guidelines specific to Indian populations.
      </li>
      <li>
        <a href="https://www.icmr.gov.in/" target="_blank" rel="noreferrer">
          Indian Council of Medical Research (ICMR)
        </a>{" "}
        – Recommends exercise and diet guidelines based on BMI and health
        needs.
      </li>
      <li>
        <a href="https://www.nhp.gov.in/" target="_blank" rel="noreferrer">
          National Health Portal of India
        </a>{" "}
        – Offers BMI-based nutrition and physical activity advice for
        disease prevention.
      </li>
    </ul>
  </div>

  <div style={panelStyle}>
    <h2 style={{ textAlign: "center", color: "#3b0764" }}>
      Global Health Authorities
    </h2>
    <ul style={{ lineHeight: 1.8, paddingLeft: "1.5rem" }}>
      <li>
        <a
          href="https://www.who.int/news-room/fact-sheets/detail/physical-activity"
          target="_blank" rel="noreferrer"
        >
          World Health Organization (WHO)
        </a>{" "}
        – Advises physical activity tailored to BMI for long-term health
        benefits.
      </li>
      <li>
        <a
          href="https://www.cdc.gov/physicalactivity/basics/adults/index.htm"
          target="_blank" rel="noreferrer"
        >
          Centers for Disease Control and Prevention (CDC)
        </a>{" "}
        – Supports BMI-based fitness and nutrition planning.
      </li>
      <li>
        <a
          href="https://www.acsm.org/read-research/resource-library"
          target="_blank" rel="noreferrer"
        >
          American College of Sports Medicine (ACSM)
        </a>{" "}
        – Offers structured routines and dietary strategies linked to BMI.
      </li>
      <li>
        <a
          href="https://pubmed.ncbi.nlm.nih.gov/19127177/"
          target="_blank" rel="noreferrer"
        >
          NIH & PubMed Research
        </a>{" "}
        – Scientific evidence showing the success of BMI-specific diet and
        fitness routines.
      </li>
      <li>
        <a
          href="https://www.hsph.harvard.edu/nutritionsource/healthy-weight/"
          target="_blank" rel="noreferrer"
        >
          Harvard School of Public Health
        </a>{" "}
        – Explains the link between BMI and optimal health decisions.
      </li>
    </ul>
  </div>

  <p
    style={{
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#1e3a8a",
      fontWeight: 500,
      padding: "1rem",
    }}
  >
    You're not just following a plan—you're following a path built on <strong>expertise, safety, and science</strong>.
    <br /> Stay strong, stay committed, and trust the process.
  </p>
</div>

); };

export default TrustedRecommendations;


