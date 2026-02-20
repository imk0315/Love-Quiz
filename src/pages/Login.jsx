<div className={`${styles.recentPanel} card`}>
  <div className="section-title" style={{ marginBottom: 10 }}>🏆 最新測驗結果</div>
  {RECENT.map((r, i) => (
    <div key={i} className={styles.resultItem}>
      <div className={styles.resultAvatar}>{r.avatar}</div>
      <div className={styles.resultInfo}>
        <div className={styles.rname}>{r.user}</div>
        <div className={styles.rtype}>✦ {r.type}</div>
      </div>
    </div>
  ))}
</div>