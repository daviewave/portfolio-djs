"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  CarouselButton,
  CarouselButtonDot,
  CarouselButtons,
  CarouselContainer,
  CarouselItem,
  CarouselItemImg,
  CarouselItemText,
  CarouselItemTitle,
  CarouselMobileScrollNode,
  ScrollableSectionText,
} from "./TimeLineStyles";
import {
  TimlineSection,
  TimelineText,
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { TimeLineData } from "../../constants/constants";

const TOTAL_CAROUSEL_COUNT = TimeLineData.length;

const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();

  const scroll = (node, left) => {
    if (node !== null) {
      return node.scrollTo({ left, behavior: "smooth" });
    }
  };

  //accepts the click event and index as params
  const handleClick = (event, i) => {
    event.preventDefault();

    //if there is a carosuel reference present, when we click it we want to scroll to the left
    if (carouselRef.current) {
      const scrollLeft = Math.floor(
        carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length)
      );

      scroll(carouselRef.current, scrollLeft);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(
        (carouselRef.current.scrollLeft /
          (carouselRef.current.scrollWidth * 0.7)) *
          TimeLineData.length
      );

      setActiveItem(index);
    }
  };

  // snap back to beginning of scroll when window is resized
  // avoids a bug where content is covered up if coming from smaller screen
  useEffect(() => {
    const handleResize = () => {
      scroll(carouselRef.current, 0);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>
      <TimelineText>
        <strong style={{ fontSize: "1.4em", color: "silver" }}>
          Education{" "}
        </strong>{" "}
        <br />
        I earned a Bachelor’s Degree in Neuroscience with a concentration in
        Neuroscience and a minor in Computer Science from the University of
        Massachusetts Amherst in 2021. In January 2022, I completed an intensive
        Full Stack Web Development Boot Camp at Columbia University, building a
        strong foundation in modern development technologies and real-world
        projects.
        <br />
        <br />
        <strong style={{ fontSize: "1.4em", color: "silver" }}>
          Professional Experience{" "}
        </strong>
        <br />
        <strong style={{ fontSize: "1.1em", color: "silver" }}>
          Forum Systems:{" "}
        </strong>
        I began my career at Forum Systems as a frontend software engineer,
        hired to work on the React.js interfaces for their AI healthcare
        application, Quantum Sim. Not long after, I became the first external
        engineer hired onto the project and quickly expanded beyond the
        frontend, gaining exposure to every component of the system. I moved
        into the backend with Django, where I designed REST APIs and developed
        machine learning features including NLP-driven healthcare benefit
        encoding and PDF contract risk analysis using Word2Vec, Transformer, and
        GPT models. I also dove into DevOps, writing Bash scripts to build
        packaged, containerized applications and transferring them onto Linux
        servers for on-prem deployments, while also managing backups and data
        handling for Blue Cross Blue Shield. My eagerness to learn and
        contribute wherever I could led to my role broadening into a generalized
        software engineer, which had me touching frontend design, backend logic,
        data workflows, and deployment processes. I even created a developer
        productivity toolkit in the form of a “dev-shortcuts” repository to
        streamline onboarding for new hires. Working closely with C-level
        executives, I helped shape the direction of new features and came away
        from the role with a holistic view of building and maintaining a complex
        AI-driven application.
        <br />
        <br />
        <strong style={{ fontSize: "1.1em", color: "silver" }}>
          Easy Covers Software Venture:{" "}
        </strong>
        After a year in the startup grind building Quantum Sim, I decided to
        branch out on my own. Confident in my skills and motivated by a clear
        problem I saw in the recruiting industry, I founded Easy Covers
        Software. I had noticed how junior recruiters often struggled to
        evaluate technical candidates, leading to awkward gaps in communication
        with hiring managers and a reliance on “buzzword” editing that usually
        backfired. To fix this, I built an application that allowed recruiters
        to initiate phone calls directly through the app, automatically
        transcribe the conversations, and then use large language models to
        generate structured notes that could be cleanly passed to hiring
        managers. I started by building my own transcription pipeline using
        Hugging Face models, Kaldi, and Python tools, eventually incorporating
        OpenAI’s Whisper for higher-quality speech recognition. Once
        transcribed, the system would feed conversations into GPT models, which
        extracted technical highlights and produced match scores to help
        recruiters evaluate candidate fit more objectively. On the engineering
        side, I created a microservices architecture with Django, Flask, and
        Redis to keep the system scalable and responsive, while designing the
        frontend with Next.js and Material-UI. At the same time, I built a full
        business case around the product, writing a 25-page business plan and
        producing multiple pitch decks that landed meetings with venture
        capitalists and major players in the space. While I was ultimately
        unable to close a funding round, the experience pushed my technical
        abilities further than ever and gave me invaluable exposure to the
        business side of software development, something that fundamentally
        changed the trajectory of my career.
        <br />
        <br />
        <strong style={{ fontSize: "1.1em", color: "silver" }}>
          Skaion Corporation:{" "}
        </strong>
        After Easy Covers, I took on a contract role with Skaion Corporation, a
        veteran-owned company with a focus on government R&D contracts. This was
        a completely different environment than my previous roles, since
        security and offline functionality were top priorities and cloud-based
        solutions were not an option. I engineered a Python backend framework
        from the ground up, first building it in Django and then transitioning
        it into modular Python scripts to better align with evolving project
        requirements. On the frontend, I built a React.js framework for guiding
        users through backend-driven workflows, incorporating advanced
        visualization with react-force-graph in both 2D and 3D, as well as
        charting components for dynamic data displays. To ensure secure
        deployment, I containerized each component using Docker and managed
        packaging with custom Bash scripts. I also developed an AI microservice
        with GPT4All, which ran fully offline and used Celery and Redis to
        handle asynchronous requests and manage memory constraints. Beyond the
        code, I regularly met with stakeholders to present technical progress,
        gather feedback, and adapt project goals, playing a part in securing
        additional funding rounds. I also collaborated with management on
        reviewing contract proposals and refining implementation plans, giving
        me deeper insight into how government-funded projects are structured and
        executed.
        <br />
        <br />
        Across these experiences, I’ve blended full-stack engineering with AI,
        data visualization, and research-driven problem solving. I’ve had the
        chance to work in very different environments—from private startups to
        government R&D—each of which taught me new approaches to software
        design. What ties them together is my drive to build technology that is
        secure, intuitive, and ultimately delivers real-world value.
      </TimelineText>
      <CarouselContainer ref={carouselRef} onScroll={handleScroll}>
        {/* TimeLineData was defined as a constant and imported above */}
        <>
          {TimeLineData.map((item, index) => (
            // Now that we know what we are looping over (our timeline specified in constants) need to display the data
            <CarouselMobileScrollNode
              key={index}
              final={index === TOTAL_CAROUSEL_COUNT - 1}
            >
              <CarouselItem
                index={index}
                id={`carousel__item-${index}`}
                active={activeItem}
                onClick={(e) => handleClick(e, index)}
              >
                <CarouselItemTitle>
                  {`${item.year}`}
                  <CarouselItemImg
                    width="208"
                    height="6"
                    viewBox="0 0 208 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.5 5.5C3.88071 5.5 5 4.38071 5 3V3.5L208 3.50002V2.50002L5 2.5V3C5 1.61929 3.88071 0.5 2.5 0.5C1.11929 0.5 0 1.61929 0 3C0 4.38071 1.11929 5.5 2.5 5.5Z"
                      fill="url(#paint0_linear)"
                      fillOpacity="0.33"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="-4.30412e-10"
                        y1="0.5"
                        x2="208"
                        y2="0.500295"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop
                          offset="0.79478"
                          stopColor="white"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </CarouselItemImg>
                </CarouselItemTitle>
                {/* this says we want to go to constants, find the timeline array and specify what we did each year */}
                <CarouselItemText>{item.text}</CarouselItemText>
              </CarouselItem>
            </CarouselMobileScrollNode>
          ))}
        </>
      </CarouselContainer>
      <CarouselButtons>
        {TimeLineData.map((item, index) => (
          <CarouselButton
            key={index}
            index={index}
            active={activeItem}
            onClick={(e) => handleClick(e, index)}
            type="button"
          >
            <CarouselButtonDot active={activeItem} />
          </CarouselButton>
        ))}
      </CarouselButtons>
      {/* <SectionDivider /> */}
    </Section>
  );
};

export default Timeline;
