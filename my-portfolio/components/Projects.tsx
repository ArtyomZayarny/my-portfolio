"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { IProject, ProjectTagsEnum } from "../types";

const projectsData: IProject[] = [
  {
    id: 0,
    title: "Tickets booking system",
    image: "/images/projects/tickets-booking.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/booking-ticks/",
    previewUrl: "https://booking-ticks-fe.vercel.app/",
  },
  {
    id: 1,
    title: "Trello clone",
    image: "/images/projects/trello-clone.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/TaskManager",
    previewUrl: "/images/projects/trello-clone.png",
  },

  {
    id: 2,
    title: "Booking clone (front-end)",
    image: "/images/projects/booking-fe.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/booking-fe",
    previewUrl: "/images/projects/booking-fe.png",
  },
  {
    id: 3,
    title: "Bike booking admin panel",
    image: "/images/projects/bike-admin.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/bike-booking",
    previewUrl: "/images/projects/bike-admin.png",
  },
  {
    id: 4,
    title: "Article management system",
    image: "/images/projects/article-manager.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/article-manager",
    previewUrl: "/images/projects/article-manager.png",
  },
  {
    id: 5,
    title: "Landing page",
    image: "/images/projects/landing-page.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/lp-mnmlst",
    previewUrl: "https://lp-mnmlst.vercel.app/",
  },
];

const Projects = () => {
  const [tag, setTag] = useState(ProjectTagsEnum.All);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: ProjectTagsEnum) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project: IProject) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name={ProjectTagsEnum.All}
          isSelected={tag === ProjectTagsEnum.All}
        />
        <ProjectTag
          onClick={handleTagChange}
          name={ProjectTagsEnum.Web}
          isSelected={tag === ProjectTagsEnum.Web}
        />
        <ProjectTag
          onClick={handleTagChange}
          name={ProjectTagsEnum.Mobile}
          isSelected={tag === ProjectTagsEnum.Mobile}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project: IProject, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
