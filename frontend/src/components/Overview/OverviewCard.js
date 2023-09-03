import React from "react";
import AppContext from "../../context/app-context";
import styles from "./OverviewCard.module.css";

const OverviewCard = (props) => {
  const ctx = React.useContext(AppContext);
  const [countryCount, setCountryCount] = React.useState(0);
  const [topicCount, setTopicCount] = React.useState(0);
  const [sectorCount, setSectorCount] = React.useState(0);
  const [sourceCount, setSourceCount] = React.useState(0);
  const [articleCount, setArticleCount] = React.useState(0);
  // const topicCount = ctx.topics.length;
  // const sectorCount = ctx.sectors.length;
  // const sourceCount = ctx.sources.length;
  // const articleCount = ctx.articles.length;

  React.useEffect(() => {
    const topicIntervalId = setInterval(() => {
      setTopicCount((i) => {
        if (i + 1 === ctx.topics.length) clearInterval(topicIntervalId);
        return i + 1;
      });
    }, 12);
    const sectorIntervalId = setInterval(() => {
      setSectorCount((i) => {
        if (i + 1 === ctx.sectors.length) clearInterval(sectorIntervalId);
        return i + 1;
      });
    }, 50);
    const sourceIntervalId = setInterval(() => {
      setSourceCount((i) => {
        if (i + 1 === ctx.sources.length) clearInterval(sourceIntervalId);
        return i + 1;
      });
    }, 1);
    const countryIntervalId = setInterval(() => {
      setCountryCount((i) => {
        if (i + 1 === ctx.countries.length) clearInterval(countryIntervalId);
        return i + 1;
      });
    }, 10);
    const articleIntervalId = setInterval(() => {
      setArticleCount((i) => {
        if (i + 5 === ctx.articles.length) clearInterval(articleIntervalId);
        return i + 5;
      });
    }, 10);
  }, [
    ctx.countries.length,
    ctx.topics.length,
    ctx.sectors.length,
    ctx.sources.length,
    ctx.articles.length,
  ]);

  return (
    <>
      <h3 className={styles.overviewHeading}>Some trivia about the survey</h3>
      <div className={styles.overviewBody}>
        <div
          className={styles.overviewContent}
          style={{ borderRight: "2px solid #003366" }}
        >
          <ul>
            <li>
              <div>
                <ion-icon name="earth"></ion-icon>
              </div>
              <div>
                Data collected from{" "}
                <span className={styles.quantity}>{countryCount}</span>{" "}
                countries
              </div>
            </li>
            <li>
              <div>
                <ion-icon name="book"></ion-icon>
              </div>
              <div>
                Including insights from{" "}
                <span className={styles.quantity}>{sectorCount}</span> different
                sectors
              </div>
            </li>
            <li>
              <div>
                <ion-icon name="cog-sharp"></ion-icon>
              </div>{" "}
              <div>
                Spanning over{" "}
                <span className={styles.quantity}>{topicCount}</span> unique
                topics
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.overviewContent}>
          <ul>
            <li>
              <div>
                <ion-icon name="newspaper-sharp"></ion-icon>
              </div>{" "}
              <div>
                Over <span className={styles.quantity}>{sourceCount}</span>{" "}
                trusted sources cited
              </div>
            </li>
            <li>
              <div>
                <ion-icon name="analytics-sharp"></ion-icon>
              </div>{" "}
              <div>
                Analytics includes{" "}
                <span className={styles.quantity}>{articleCount}</span> data
                items
              </div>
            </li>
            <li>
              <div>
                <ion-icon name="people-sharp"></ion-icon>
              </div>{" "}
              <div>
                Unbiased and unaltered analysis under{" "}
                <span className={styles.quantity}>{1}</span> platform
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OverviewCard;
