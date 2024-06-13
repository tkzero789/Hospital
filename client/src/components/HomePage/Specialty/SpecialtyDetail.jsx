import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Cardiology1 from "assets/home/cardi1.jpg";
import Orthopedic1 from "assets/home/orthopedic1.jpg";
import Internal1 from "assets/home/internal1.jpg";
import Dental1 from "assets/home/dental1.jpg";
import Eyes1 from "assets/home/eyes1.jpg";
import Lab1 from "assets/home/lab1.jpg";
import Ents1 from "assets/home/ents1.jpg";
import Neuron1 from "assets/home/neuron1.jpg";
import Footer from "components/HomePage/Footer/Footer";
import "components/HomePage/Specialty/specialty.scss";

const SpecialtyDetail = () => {
  const { specialtyId } = useParams();

  const specialties = [
    {
      id: "cardiology",
      name: "Cardiology",
      info: "Cardiology is the medical treatment of diseases of the heart and parts of the circulatory system. Cardiologists are the doctors who specialize in diagnosing and treating these conditions.",
      img: Cardiology1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "Cardiovascular disease (CVD) is one of the most prevalent and serious health concerns worldwide. Common symptoms include:",
          sub2: "The causes of cardiovascular disease (CVD) are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Seeking medical attention for cardiovascular disease (CVD) is crucial for timely diagnosis, effective treatment, and improved outcomes. Here are some of the key benefits of receiving professional care for CVD:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Advancements in medical technology have introduced a range of non-invasive and accurate diagnostic methods for cardiovascular disease (CVD). These techniques and technologies are:",
      },
      item: {
        item1: [
          "Chest pain or discomfort.",
          "Shortness of breath.",
          "Unexplained fatigue.",
          "Irregular heartbeat.",
          "Dizziness or lightheadedness.",
        ],
        item2: [
          "Atherosclerosis: This is a narrowing of the arteries caused by the buildup of plaque, a hard, fatty deposit that forms on the inner walls of arteries. Plaque can restrict blood flow and increase the risk of blood clots.",
          "Arterial blockage: This occurs when a blood clot, plaque, or other debris blocks an artery, preventing blood from flowing through it. Arterial blockages can lead to heart attack, stroke, and other serious health problems.",
        ],
        item3: [
          "Receive a diagnosis and assessment of your health condition.",
          "Obtain guidance on self-care and treatment options.",
          "Receive counseling on healthy lifestyle and dietary habits to reduce risk factors.",
          "Initiate timely treatment to prevent dangerous complications.",
        ],
        item4: [
          "Electrocardiogram (ECG or EKG): Measures and records the electrical activity of the heart.",
          "Blood tests: Measure cardiovascular-related indicators such as cholesterol, triglycerides, and cardiac enzymes.",
          "Chest X-ray: Creates images of the heart and lungs to detect issues like arterial blockages or tumors.",
          "Echocardiogram: Uses ultrasound to create precise images of the heart's structure and function.",
        ],
      },
      summary:
        "In conclusion, the prompt recognition and diagnosis of cardiovascular disease (CVD) are paramount to initiating timely treatment and preventing life-threatening complications. The utilization of advanced medical techniques and technologies empowers healthcare providers with precise information and clear visualizations of the cardiovascular system, enabling them to collaborate effectively with patients in managing and treating CVD.",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      info: "Orthopedists are doctors who take care of the entire musculoskeletal system. They diagnose and treat conditions such sprains, strains, broken bones, arthritis and  osteoporosis. Some of the treatments they offer include recommending lifestyle changes, applying casts and performing surgeries, such as ligament repairs or total joint replacements.",
      img: Orthopedic1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "Musculoskeletal problems can be recognized by signs such as:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Consulting a orthopedic doctor is crucial for accurate diagnosis and timely treatment. Here are some reasons why you should schedule an appointment:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Advancements in medical technology have introduced a range of non-invasive and accurate diagnostic methods for orthopedics. These techniques and technologies are:",
      },
      item: {
        item1: [
          "Pain or discomfort in bones, joints, or muscles.",
          "Swelling, redness, warmth, or tightness in the affected area.",
          "Reduced range of motion or flexibility.",
          "Deformity, inability to stand upright, or unnatural movement.",
          "Caused by trauma, inflammation, or other mechanical issues.",
        ],
        item2: [
          "Musculoskeletal trauma: car crashes, falls, repetitive motions, everyday activities, such as lifting heavy objects or twisting awkwardly, can cause fractures, sprains, and strains.",
          "Arthritis: osteoarthritis, rheumatoid arthritis, ankylosing spondylitis, these can cause inflammation, pain, and joint damage",
          "Ankylosing spondylitis: causes inflammation and stiffness in the spine and joints, leading to pain, limited range of motion, and, in some cases, spinal fusion.",
        ],
        item3: [
          "Accurate diagnosis of your musculoskeletal issue.",
          "Personalized treatment plan and rehabilitation guidance.",
          "Learn to prevent injuries and protect your musculoskeletal health.",
          "Timely treatment to prevent complications and improve quality of life.",
        ],
        item4: [
          "X-ray: common imaging technique that uses electromagnetic radiation to create detailed images of the bones and joints.",
          "MRI (Magnetic Resonance Imaging): utilizes strong magnetic fields and radio waves to generate detailed cross-sectional images of the body.",
          "CT scan: a type of imaging technique that uses X-rays to create detailed three-dimensional images of the body.",
          "Other diagnostic procedures: blood tests, musculoskeletal function tests and diagnostic injections",
        ],
      },
      summary:
        "In essence, proper care and treatment of musculoskeletal issues play a pivotal role in enhancing a patient's quality of life and overall mobility. Seeking consultation from musculoskeletal specialists to receive an accurate diagnosis and personalized treatment plan is the crucial first step towards recovery and preventing complications.",
    },
    {
      id: "surgery",
      name: "Surgery",
      info: "Surgery is a branch of medicine that involves treating diseases or injuries by adjusting or removing organs, tissues or bones. procedures, like cardiac surgery, or elective procedures, such as joint replacement.",
      img: Internal1,
      sign: {
        header: "Our services",
        sub: {
          sub1: "Our experienced surgeons perform a variety of surgeries, including:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Here are some of the key benefits of receiving professional care from our surgeons:",
      },
      technique: {
        header: "Treatments",
        sub: "Advancements in medical technology have introduced a range of non-invasive and accurate diagnostic methods for surgery. These techniques and technologies are:",
      },
      item: {
        item1: [
          "Severe abdominal pain.",
          "Persistent vomiting or nausea.",
          "Diarrhea, constipation, and digestive issues.",
          "Internal bleeding.",
          "General symptoms such as fatigue and weakness.",
        ],
        item2: [
          "Unhealthy lifestyle choices such as an unbalanced diet and lack of exercise.",
          "Genetic factors.",
          "Age and environmental factors such as pollution.",
        ],
        item3: [
          "Improved quality of life.",
          "Pain relief.",
          "Increased life expectancy.",
          "Improved overall health.",
        ],
        item4: [
          "Surgical Robots.",
          "Advanced Imaging Techniques.",
          "Computer-Aided Surgery (CAS).",
          "Telemedicine in Surgery.",
        ],
      },
      summary:
        "The surgery department is dedicated to providing exceptional surgical care to patients. Their mission is to utilize advanced technologies and techniques, like robotic surgery and 3D imaging, to diagnose and treat a wide range of conditions. This includes everything from routine procedures to complex surgeries for cancer or transplants. They emphasize evidence-based treatments to optimize patient outcomes. The department's services encompass the entire surgical journey, from pre-operative assessment to ensure a safe procedure, to post-operative care that includes pain management, wound care, and rehabilitation to promote healing. By combining their expertise with cutting-edge technology, the surgery department strives to deliver the best possible surgical experience for improved patient quality of life and overall health.",
    },
    {
      id: "pediatricians",
      name: "Pediatricians",
      info: "Pediatric Primary Care is focused specifically on infants, children and adolescents up to 21 years old. At AdventHealth Medical Group, our pediatricians are passionate about enhancing the lives of children and their families by providing the highest quality medical care with compassion and respect.",
      img: Dental1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "These following symptoms indicate that you should seek care from a family medicine provider:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Here are some of the key benefits of receiving professional care from our doctors:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Our doctors are happy to assist patients with following process:",
      },
      item: {
        item1: [
          "Acute illness.",
          "Chronic condition management.",
          "Persistent pain.",
          "General health concerns.",
        ],
        item2: [
          "Undiagnosed medical condition.",
          "Preventative care needs.",
          "Management of multiple health issues.",
        ],
        item3: [
          "Long-Term, Personalized Care.",
          "Coordinated Care for All Your Needs.",
          "Preventive Care Focus.",
        ],
        item4: [
          "In-office Procedures.",
          "Telemedicine.",
          "Remote Patient Monitoring.",
        ],
      },
      summary:
        "Seeking care from a family doctor offers a multitude of benefits.  First and foremost, you establish a long-term relationship with a doctor who understands your unique medical history and family health patterns. This personalized approach allows for tailored treatment plans and better long-term health outcomes. Family doctors also act as central coordinators for your healthcare journey, managing a wide range of concerns and referring you to specialists when needed. This eliminates the hassle of navigating various providers and ensures seamless communication within your care team.",
    },
    {
      id: "diabetes",
      name: "Diabetes",
      info: "Diabetes is a disease that affects the body's production of glucose and insulin levels. Type 1 diabetes occurs when the pancreas doesn't produce enough insulin. Type 2, gestational and prediabetes are all a result of an excess amount of sugar in the blood (high glucose levels).",
      img: Eyes1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "These following symptoms indicate that you should seek professional care from our doctors:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Here are some of the key benefits of receiving professional care from our doctors:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Our doctors are happy to assist patients with following process:",
      },
      item: {
        item1: [
          "Increased thirst and urination.",
          "Unexplained weight loss.",
          "Blurred vision.",
        ],
        item2: [
          "Insulin resistance.",
          "Lack of insulin production.",
          "Genetic predisposition.",
        ],
        item3: [
          "Improved Blood Sugar Control.",
          "Reduced Risk of Complications.",
          "Enhanced Quality of Life.",
        ],
        item4: [
          "Diagnosis and Assessment.",
          "Developing a Personalized Treatment Plan.",
          "Ongoing Management and Support.",
        ],
      },
      summary:
        "Ultimately, effective diabetes management with a doctor's help leads to an improved quality of life with reduced fatigue, more energy, and the ability to fully participate in desired activities. So, don't hesitate to seek professional help – it can empower you to manage your diabetes and live a healthier, more fulfilling life.",
    },
    {
      id: "women-care",
      name: "Women's care",
      info: " Whether you're in adolescence, menopause or somewhere in between, your health needs come first. Our women's care specialists are committed to making sure that happens as they support you through every stage of life.",
      img: Lab1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "These following symptoms indicate that you should seek professional care from our doctors:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Here are some of the key benefits of receiving professional care from our doctors:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Our doctors are happy to assist patients with following process:",
      },
      item: {
        item1: [
          "Irregular or painful periods.",
          "Vaginal discharge changes.",
          "Pelvic pain.",
        ],
        item2: [
          "Hormonal fluctuations.",
          "Reproductive health concerns.",
          "Sexually transmitted infections (STIs).",
        ],
        item3: [
          "Comprehensive Care Throughout Life Stages.",
          "Early Detection and Prevention.",
          "Empowerment and Improved Quality of Life.",
        ],
        item4: [
          "Initial Consultation and Evaluation.",
          "Developing a Personalized Care Plan.",
          "Ongoing Care and Follow-Up.",
        ],
      },
      summary:
        "Taking charge of your health as a woman is crucial throughout every stage of life. Women's health specialists offer comprehensive care, addressing your needs from adolescence to menopause and beyond.  Regular checkups and screenings allow for early detection of potential issues like breast cancer or cervical cancer, significantly improving treatment outcomes.",
    },
    {
      id: "family-medicine",
      name: "Family medicine",
      info: "Family medicine refers to primary medical services offered to patients of all ages, from newborn to adult. These services can include everything from routine check-ups and preventive health screenings to care for acute illnesses such as the cold and flu; management of chronic conditions such as asthma, arthritis, hypertension, obesity and diabetes; care for minor injuries; flu shots and immunizations; and other non-emergency procedures.",
      img: Ents1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "These following symptoms indicate that you should seek professional care from our doctors:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Here are some of the key benefits of receiving professional care from our doctors:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Our doctors are happy to assist patients with following process:",
      },
      item: {
        item1: [
          "Acute illness.",
          "Chronic condition management.",
          "Persistent pain.",
        ],
        item2: [
          "Undiagnosed medical condition.",
          "Preventative care needs.",
          "Management of multiple health issues.",
        ],
        item3: [
          "Long-Term, Personalized Care.",
          "Coordinated Care for All Your Needs.",
          "Preventive Care Focus.",
        ],
        item4: [
          "Initial Evaluation and Diagnosis.",
          "Developing a Treatment Plan.",
          "Ongoing Care and Follow-Up.",
        ],
      },
      summary:
        "Family medicine prioritizes preventive care through checkups, screenings, and vaccinations. This proactive approach can prevent future health problems or detect them early, leading to better long-term health outcomes. In short, family medicine provides personalized, coordinated, and preventive care, all under one roof, empowering you to take charge of your health and live a healthier life.",
    },
    {
      id: "neurology",
      name: "Neurology",
      info: "Neurological care is the practice of medicine that focuses on the diagnosis, treatment and function of diseases relating to the nerves and nervous system. Neurologists and neurosurgeons treat disorders that affect the brain or spinal cord.",
      img: Neuron1,
      sign: {
        header: "Symptoms",
        sub: {
          sub1: "These following symptoms indicate that you should seek professional care from our doctors:",
          sub2: "The causes of these issues are often linked to a combination of:",
        },
      },
      why: {
        header: "Benefits from our services",
        sub: "Here are some of the key benefits of receiving professional care from our doctors:",
      },
      technique: {
        header: "Treatments and technologies",
        sub: "Our doctors are happy to assist patients with following process:",
      },
      item: {
        item1: [
          "Seizures.",
          "Numbness, weakness, or tingling.",
          "Balance problems or difficulty walking.",
        ],
        item2: ["Infections.", "Head injury.", "Neurological disorders."],
        item3: [
          "Improved Diagnosis and Treatment.",
          "Enhanced Management of Chronic Conditions.",
          "Access to Advanced Treatments and Technology.",
        ],
        item4: [
          "Pharmacological Therapy.",
          "Non-Pharmacological Interventions.",
          "Therapeutic Interventions.",
        ],
      },
      summary:
        "Many neurological conditions are chronic, but with proper care, you can effectively manage them and improve your quality of life. Neurologists work with you to create a comprehensive plan, including medications, lifestyle modifications, and guidance on managing symptoms and preventing complications. This empowers you to live a more fulfilling life despite your condition.",
    },
  ];

  const specialty = specialties.find(
    (specialty) => specialty.id === specialtyId
  );

  let info = specialty.info;
  let infoSplit = info.split("\n").map((item, index) => (
    <React.Fragment key={`${index}-${specialty.id}`}>
      <p>{item}</p>
      <br />
    </React.Fragment>
  ));

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{specialty.name}</title>
        </Helmet>
      </HelmetProvider>
      <div className="content-container">
        <Breadcrumbs
          className="breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link className="text-blue-2" to="/home">
            Home
          </Link>
          ,
          <Link className="text-blue-2" to="/specialty-page">
            Specialty
          </Link>
        </Breadcrumbs>
      </div>
      <div className="content-container">
        <div className="c-9 md-12">
          <h1 className="specialty__detail-header">{specialty.name}</h1>
          <div className="specialty__detail">
            <div className="specialty__detail-intro">{infoSplit}</div>
            <div className="specialty__detail-img">
              <img src={specialty.img} alt="Cardiology" />
            </div>
          </div>
          <div className="specialty__detail-info">
            {/* Symptoms */}
            <h3>{specialty.sign.header}</h3>
            <p>{specialty.sign.sub.sub1}</p>
            <ul>
              {specialty.item.item1.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{specialty.sign.sub.sub2}</p>
            <ul>
              {specialty.item.item2.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {/* Benefits */}
            <h3>{specialty.why.header}</h3>
            <p>{specialty.why.sub}</p>
            <ul>
              {specialty.item.item3.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {/* Treatments */}
            <h3>{specialty.technique.header}</h3>
            <p>{specialty.technique.sub}</p>
            <ul>
              {specialty.item.item4.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="specialty__detail-summary">
              <span>{specialty.summary}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialtyDetail;
