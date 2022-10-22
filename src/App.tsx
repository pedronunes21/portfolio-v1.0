import React, { useEffect, useState } from 'react';

import Layout from './components/Layout';

import AOS from 'aos'
import "aos/dist/aos.css"

import HTMLReactParser from 'html-react-parser';

type Experience = {
  title: string,
  date: string,
  content: string
}

type About = {
  title: string,
  content: string
}

type Projects = {
  title: string,
  info_button: string,
}

interface DataType {
  experience: Array<Experience>,
  about: About,
  skills: {
    title: string
  }
  projects: Projects
}

// const rawData:DataType = require('./db.json');

function App() {
  const defaultLanguage = navigator.language.includes("pt") ? "pt" : "en";

  const [activeLang, setActiveLang] = useState<string>(defaultLanguage);
  const [data, setData] = useState<DataType>(require('./db.json')[defaultLanguage]);

  const [experience, setExperience] = useState<Experience & {active: number}>({...data.experience[0], active: 0});

  const skills = [
    {img: "/icons/Javascript.svg", name: "Javascript"},
    {img: "/icons/React.svg", name: "React.js"},
    {img: "/icons/Tailwind.svg", name: "Tailwind"},
    {img: "/icons/Html.svg", name: "HTML"},
    {img: "/icons/Php.svg", name: "PHP"},
    {img: "/icons/Next.svg", name: "Next.js"},
    {img: "/icons/Css.svg", name: "CSS"},
    {img: "/icons/Wordpress.svg", name: "Wordpress"},
    {img: "/icons/Node.svg", name: "Node.js"},
  ]

  const projects = [
    {img: "/OrganoZero.png", link: "https://organozero.com.br"},
    {img: "/Ibras.png", link: "https://organozero.com.br"},
    {img: "/Sw-solar.png", link: "https://organozero.com.br"},
    {img: "/Ggl.png", link: "https://organozero.com.br"},
    {img: "/Golf.png", link: "https://organozero.com.br"},
  ]

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    })
  }, []);

  function changeLang(lang:string) {
    setData(require('./db.json')[lang]);
    setActiveLang(lang);
  }

  return (
    <Layout lang={activeLang} changeLang={changeLang}>
      <div className='tw-flex tw-items-center tw-justify-center tw-px-[20px] tw-py-[50px] tw-max-w-[1024px] tw-mx-auto tw-w-full tw-flex-col md:tw-flex-row tw-gap-[30px] sm:tw-gap-[10px]'>
        <div data-aos="fade-right" className='tw-w-full md:tw-w-[50%] tw-flex tw-items-center tw-justify-center md:tw-justify-start'>
          <div className='tw-max-w-[400px] tw-w-full tw-flex tw-items-start tw-flex-col tw-gap-[20px]'>
            <h1 className='tw-text-[42px] sm:tw-text-[56px] tw-font-extrabold tw-text-black tw-leading-[90%]'>Olá, <span className='tw-text-[28px] sm:tw-text-[32px]'>sou</span><br/>Pedro Nunes, <br/><span className='tw-text-[28px] sm:tw-text-[32px]'>Desenvolvedor Web</span></h1>
            <span className='tw-block'>Trabalho com programação de sites, tanto frontend quanto backend.</span>
            <div className='tw-flex tw-items-center tw-justify-start tw-gap-[20px]'>
              <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/pedro-nunes-23a767184/"><img src="/Linkedin.svg" alt="Linkedin" /></a>
              <a target="_blank" rel="noreferrer" href="https://github.com/neto18081"><img src="/GitHub.svg" alt="Github" /></a>
            </div>
          </div>
        </div>
        <div data-aos="slide-right" className='tw-w-full md:tw-w-[50%]'>
          <img src="/banner.png" alt="Pedro Nunes" />
        </div>
      </div>

      <div id="experiencia" className='tw-px-[20px] tw-mt-[-110px] tw-pt-[110px]'>
        <h2>Experiência & Educação</h2>

        <div className='tw-mx-auto tw-w-full tw-max-w-[1024px] tw-py-[40px] tw-flex tw-items-center tw-justify-center tw-gap-[20px] tw-flex-col md:tw-flex-row'>
          <div className='tw-flex tw-items-start tw-justify-center tw-flex-col tw-w-full md:tw-w-[30%] md:tw-border-r-[2px] tw-border-gray'>
            {data.experience.map((e, i) => (
              <button style={i === experience.active ? {borderLeft: "6px solid #4f95d0"} : undefined} 
              key={i} 
              onClick={() => setExperience({...e, active: i})} 
              className="tw-flex tw-item-start tw-justify-center tw-flex-col tw-text-left tw-border-l-[6px] tw-border-gray tw-px-[20px] tw-py-[10px] hover:tw-shadow-lg tw-duration-500 tw-ease-out">
                <span className='tw-text-[20px] tw-font-medium tw-pb-[10px]'>{e.title}</span>
                <span className='tw-text-gray'>{e.date}</span>
              </button>
            ))}
            
          </div>
          <div className='tw-w-full md:tw-w-[70%]'>
            <span className='tw-text-gray'>{experience.date}</span>
              <p className='tw-pl-[30px] tw-py-[10px] tw-font-medium'>{HTMLReactParser(experience.content)}</p>
          </div>
        </div>
      </div>

      <div id="sobre" className='tw-px-[20px] tw-py-[100px] tw-mx-auto tw-w-full tw-max-w-[1024px]'>
        <h2 className='tw-text-left tw-pb-[20px]'>{data.about.title}</h2>
        <p>
          {HTMLReactParser(data.about.content)}
        </p>
      </div>

      <div id="habilidades" className='tw-px-[20px] tw-py-[100px] tw-mx-auto tw-w-full tw-max-w-[1024px]'>
        <h2>{data.skills.title}</h2>
        <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-[20px] tw-py-[50px] tw-max-w-[220px] sm:tw-max-w-[768px] tw-mx-auto tw-w-full'>
        {skills.map((s, i) => (
          <div key={i} className="tw-flex tw-items-center tw-justify-start tw-gap-[20px]">
            <img className='tw-w-[75px]' src={s.img} alt={s.name} />
            <span style={{fontFamily: "Nunito Sans"}} className='tw-text-[24px] tw-font-medium'>{s.name}</span>
          </div>
        ))}
        </div>
      </div>

      <div id="projetos" className='tw-px-[20px] tw-py-[100px] tw-mx-auto tw-w-full tw-max-w-[1024px]'>
          <h2>{data.projects.title}</h2>
          <div className='tw-w-full tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-py-[50px]'>
            {projects.map((p, i) => (
              <a target="_blank" rel="noreferrer" 
              href={p.link} 
              className='project tw-relative tw-w-[300px] tw-h-[300px] tw-overflow-hidden after:tw-content-[""] after:tw-w-full after:tw-h-full after:tw-absolute after:tw-top-0 after:tw-left-0 after:tw-bg-[rgba(0,0,0,.3)] after:tw-opacity-0 after:hover:tw-opacity-100 tw-duration-300 tw-ease-out'
              key={i}>
                <div className='tw-w-[100px] tw-h-[100px] tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%] tw-bg-[#4F95D0] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-pointer-events-none tw-z-[1] tw-opacity-0 tw-duration-300 tw-ease-out'>
                  <span className='tw-font-medium tw-text-[22px] tw-text-white tw-text-center tw-leading-[100%]' style={{fontFamily: "Nunito Sans"}}>{HTMLReactParser(data.projects.info_button)}</span>
                </div>
                <img className='tw-w-full tw-object-cover tw-duration-300 tw-ease-out' src={p.img} alt="" />
              </a>
            ))}
          </div>
      </div>
    </Layout>
  );
}

export default App;
