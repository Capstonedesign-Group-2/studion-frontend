const PasswordConfirm = () => {
  return (
    <div className={styles.container}>
      <h2>ログイン</h2>
      <article>
        <div className={styles.formDiv}>
          {errorMsg && // 에러 메세지
            <ErrorMessage errorMsg={errorMsg} />
          }
          <form onSubmit={submitHandler}>
            {/* 이메일 */}
            <label htmlFor="email" className='mt-4'>Eメールアドレス</label>
            <input id='email' name='email' type="email" value={email} onChange={onChange} />

            {/* 비밀번호 */}
            <label htmlFor="password" className='mt-4'>パスワード</label>
            <input id='password' name='password' type="password" value={password} onChange={onChange} />

            <button type='submit'>ログイン</button>
          </form>
        </div>

        {/* divider */}
        <div className={styles.divider}>
          <div></div>
          <span>OR</span>
          <div></div>
        </div>

        <div className={styles.socialContainer}>
          <button>트위터 로그인　→</button>
          <button>구글 로그인　→</button>
        </div>
      </article>
    </div>
  )
}

export default PasswordConfirm