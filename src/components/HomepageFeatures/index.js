import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '影视对白净化',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        从带有音乐/音效的片段中提取更干净的人声对白，减少底噪与串音。
      </>
    ),
  },
  {
    title: '多说话人分离',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        两人及以上对话时，分离并导出某个目标说话人的语音轨道。
      </>
    ),
  },
  {
    title: '智能降噪',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        针对嘈杂环境优化，弱化风噪/人群/车流等背景噪音，保留语音清晰度。
      </>
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
