import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: (
      <Translate id="home.features.dialogue.title" description="Feature title for dialogue cleanup">
        影视对白净化
      </Translate>
    ),
    Svg: require('@site/static/img/1.svg').default,
    description: (
      <Translate id="home.features.dialogue.desc" description="Feature description for dialogue cleanup">
        从带有音乐/音效的片段中提取更干净的人声对白，减少底噪与串音。
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="home.features.speaker.title" description="Feature title for multi-speaker separation">
        多说话人分离
      </Translate>
    ),
    Svg: require('@site/static/img/2.svg').default,
    description: (
      <Translate id="home.features.speaker.desc" description="Feature description for multi-speaker separation">
        两人及以上对话时，分离并导出某个目标说话人的语音轨道。
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="home.features.denoise.title" description="Feature title for intelligent denoise">
        智能降噪
      </Translate>
    ),
    Svg: require('@site/static/img/3.svg').default,
    description: (
      <Translate id="home.features.denoise.desc" description="Feature description for intelligent denoise">
        针对嘈杂环境优化，弱化风噪/人群/车流等背景噪音，保留语音清晰度。
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
