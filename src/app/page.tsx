import styles from "./page.module.scss";
import Steps from "../components/Steps";

const content = {
  hero: {
    title: "Transform ideas into products",
    subtitle:
      "Get the right design strategy to turn brilliant technology into products people love.",
  },
  scaling: {
    title: `Scaling a product shouldn't feel impossible.`,
    highlightText1: "users are struggling to figure it out",
    highlightText2: "slow adoption despite having great technology",
  },
  howWeWork: {
    title: "How we work",
    description1:
      "We specialise in taking functional but confusing products and making them immediately understandable.",
    description2:
      "No complete rebuilds, no months of research paralysis. Just focused improvements that eliminate user friction, reduce support burden, and turn your working technology into something people actually want to use every day.",
  },
  steps: [
    {
      title: "Audit",
      iconName: "audit",
      description:
        "Review your current product to identify the biggest usability barriers killing conversions and user adoption.",
    },
    {
      title: "Strategy",
      iconName: "strategy",
      description:
        "Prioritize which problems to solve first based on business impact and technical constraints.",
    },
    {
      title: "Design",
      iconName: "design",
      description:
        "Create interfaces that eliminate confusion and guide users to success, not just look pretty.",
    },
    {
      title: "Implementation Support",
      iconName: "implementation",
      description:
        "Work with your team during development to ensure designs work as intended in the real product.",
    },
    {
      title: "Evaluation",
      iconName: "evaluation",
      description:
        "Measure the impact and validate that the solutions effectively address the identified issues.",
    },
  ],
};

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          Transform ideas
          <br className={styles.heroBreak} />
          <span className={styles.heroSecondLine}> into products</span>
        </h1>
        <p>{content.hero.subtitle}</p>
      </section>

      {/* Scaling Product Section */}
      <section className={styles.scalingSection}>
        <div className={styles.scalingContent}>
          <div className={styles.scalingText}>
            <h2>{content.scaling.title}</h2>
            <p>
              {`You've built something that works, but `}
              <span className={styles.highlight}>
                {content.scaling.highlightText1}
              </span>
              {`. High bounce rates, support tickets for basic features, and `}
              <span className={styles.highlightBlue}>
                {content.scaling.highlightText2}
              </span>
              {` underneath — it's all fixable.`}
            </p>
          </div>
          <div className={styles.scalingImage}>
            <div className={styles.imagePlaceholder}>
              <div className={styles.personImage}></div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className={styles.howWeWork}>
        <div className={styles.howWeWorkContent}>
          <div className={styles.howWeWorkText}>
            <h2>{content.howWeWork.title}</h2>
            <p>{content.howWeWork.description1}</p>
            <p>{content.howWeWork.description2}</p>
          </div>
          <div className={styles.howWeWorkSteps}>
            <Steps steps={content.steps} />
          </div>
        </div>
      </section>
    </div>
  );
}
