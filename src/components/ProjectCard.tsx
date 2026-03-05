import { useState, useRef, type MouseEvent } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    status: "live" | "coming-soon" | "in-development";
    href?: string;
    featured?: boolean;
    icon?: string;
    techStack?: string[];
}

const statusLabels: Record<ProjectCardProps["status"], string> = {
    live: "Live",
    "coming-soon": "Coming Soon",
    "in-development": "In Development",
};

const statusColors: Record<ProjectCardProps["status"], string> = {
    live: "#38bdf8",
    "coming-soon": "#818cf8",
    "in-development": "#60a5fa",
};

export default function ProjectCard({
    title,
    description,
    status,
    href,
    featured = false,
    icon = "◆",
    techStack = [],
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const Wrapper = href ? "a" : "div";
    const wrapperProps = href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Wrapper
            {...wrapperProps}
            ref={cardRef as React.Ref<HTMLDivElement & HTMLAnchorElement>}
            className={`project-card ${featured ? "project-card--featured" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            style={{
                ["--glow-opacity" as string]: isHovered ? 1 : 0,
            }}
        >
            {/* Spotlight glow that follows cursor */}
            <div className="project-card__spotlight" />

            {/* Top accent border */}
            <div className="project-card__border-glow" />

            <div className="project-card__content">
                <div className="project-card__header">
                    <div className="project-card__icon-wrap">
                        <span className="project-card__icon">{icon}</span>
                    </div>
                    <span
                        className="project-card__status"
                        style={{
                            color: statusColors[status],
                            borderColor: `${statusColors[status]}30`,
                            background: `${statusColors[status]}10`,
                        }}
                    >
                        <span
                            className="status-dot"
                            style={{ backgroundColor: statusColors[status] }}
                        />
                        {statusLabels[status]}
                    </span>
                </div>

                <h3 className="project-card__title">{title}</h3>
                <p className="project-card__desc">{description}</p>

                {techStack.length > 0 && (
                    <div className="project-card__tech">
                        {techStack.map((tech) => (
                            <span key={tech} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {href && (
                    <span className="project-card__link">
                        <span>Explore Project</span>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                                transform: isHovered ? "translateX(4px)" : "translateX(0)",
                                transition: "transform 250ms ease",
                            }}
                        >
                            <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                )}
            </div>
        </Wrapper>
    );
}
