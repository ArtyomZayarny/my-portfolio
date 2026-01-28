import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { IProject, ProjectTagsEnum } from "../types";

const fallbackProjects: IProject[] = [
  {
    id: 8,
    title: "AI Resume builder",
    image: "/images/projects/ai-resume-builder.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/ai-builder-app",
    previewUrl: "https://ai-builder-app-kappa.vercel.app/",
  },
  {
    id: 6,
    title: "Dental care",
    image: "/images/projects/dental-care.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/dentalscaner",
    previewUrl: "https://dentalscaner-fe.vercel.app/",
  },
  {
    id: 7,
    title: "Neuro focus",
    image: "/images/projects/neuro-focus.png",
    tag: [ProjectTagsEnum.All, ProjectTagsEnum.Web],
    gitUrl: "https://github.com/ArtyomZayarny/neuro-focus",
    previewUrl: "https://neuro-focus-murex.vercel.app/",
  },
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
    previewUrl: "https://trello-clone-tau-sage.vercel.app/",
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
  const [projectsData, setProjectsData] = useState<IProject[]>(fallbackProjects);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/projects");
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const transformedProjects: IProject[] = data.data.map(
            (project: any) => {
              const tags: ProjectTagsEnum[] = [ProjectTagsEnum.All];
              if (project.tag === "Web") {
                tags.push(ProjectTagsEnum.Web);
              } else if (project.tag === "Mobile") {
                tags.push(ProjectTagsEnum.Mobile);
              }

              const imageMap: { [key: string]: string } = {
                "AI Resume builder": "/images/projects/ai-resume-builder.png",
                "Dental care": "/images/projects/dental-care.png",
                "Neuro focus": "/images/projects/neuro-focus.png",
                "Tickets booking system": "/images/projects/tickets-booking.png",
                "Trello clone": "/images/projects/trello-clone.png",
                "Bike booking admin panel": "/images/projects/bike-admin.png",
                "Article management system": "/images/projects/article-manager.png",
                "Landing page": "/images/projects/landing-page.png",
              };

              return {
                id: project.id,
                title: project.title,
                image: imageMap[project.title] || "/images/projects/placeholder.png",
                description: project.description || "",
                tag: tags,
                gitUrl: project.gitUrl,
                previewUrl: project.previewUrl,
              };
            }
          );
          setProjectsData(transformedProjects);
        }
      } catch (err) {
        console.error("Failed to fetch from Strapi, using fallback data:", err);
      }
    };

    fetchProjects();
  }, []);

  
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
      {filteredProjects.length > 0 ? (
        <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {filteredProjects.map((project: IProject, index) => (
            <motion.li
              key={project.id}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.4 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-white">
          No projects match the selected filter
        </div>
      )}
    </section>
  );
};

export default Projects;
