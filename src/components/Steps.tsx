"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Steps.module.scss";
import AuditIcon from "../assets/icons/Audit.svg";
import StrategyIcon from "../assets/icons/Strategy.svg";
import DesignIcon from "../assets/icons/Design.svg";
import ImplementationIcon from "../assets/icons/Implementation.svg";
import EvaluationIcon from "../assets/icons/Evaluation.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface StepData {
  title: string;
  iconName: string;
  description: string;
}

interface StepsProps {
  steps: StepData[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  audit: AuditIcon,
  strategy: StrategyIcon,
  design: DesignIcon,
  implementation: ImplementationIcon,
  evaluation: EvaluationIcon,
};

const Steps: React.FC<StepsProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    const container = containerRef.current;
    const stepElements = stepsRef.current.filter(Boolean);

    // Set initial state - all steps hidden except first
    stepElements.forEach((step, index) => {
      if (step) {
        gsap.set(step, {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 100,
          scale: index === 0 ? 1 : 0.9,
          zIndex: index + 1, // Higher index = higher z-index
        });
      }
    });

    // Create ScrollTrigger for the Steps container
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Ensure we get the full range of steps by using a more granular calculation
        const stepProgress = progress * stepElements.length;
        const currentStepIndex = Math.min(
          Math.floor(stepProgress),
          stepElements.length - 1
        );

        stepElements.forEach((step, index) => {
          if (step) {
            if (index === currentStepIndex) {
              // Current step: fully visible and on top
              gsap.to(step, {
                opacity: 1,
                y: 0,
                scale: 1,
                zIndex: stepElements.length + 1, // Ensure current step is always on top
                duration: 0.3,
                ease: "power2.out",
              });
            } else if (index < currentStepIndex) {
              // Previous steps: fully visible but moved up
              gsap.to(step, {
                opacity: 1,
                y: -30,
                scale: 0.95,
                zIndex: index + 1,
                duration: 0.3,
                ease: "power2.out",
              });
            } else {
              // Future steps: hidden and moved down
              gsap.to(step, {
                opacity: 0,
                y: 100,
                scale: 0.9,
                zIndex: index + 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }
        });
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [steps]);

  return (
    <div ref={containerRef} className={styles.stepsContainer}>
      <div ref={wrapperRef} className={styles.stepWrapper}>
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => {
              stepsRef.current[index] = el;
            }}
            className={styles.step}
          >
            <div className={styles.stepIcon}>
              {(() => {
                const IconComponent = iconMap[step.iconName];
                return IconComponent ? (
                  <IconComponent className={styles.stepSvg} />
                ) : null;
              })()}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepNumber}>STEP {index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
