import React, { useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import styles from '../../styles/common/layout.module.scss'
import { logOut } from "../../redux/actions/user"
import Link from "next/link"

interface Props {
  menu: boolean
  setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuBox = ({ menu, setMenu }: Props) => {
  const dispatch = useDispatch()
  const menuRef = useRef<HTMLDivElement>(null)

  const onLogout = useCallback(() => {
    dispatch(logOut())
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(!menu)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, menu, setMenu])

  return (
    <div ref={menuRef} className={styles.userOption}>
      <div className={styles.optionList}>
        <Link href="/profile"><a>プロフィール編集</a></Link>
        <a onClick={onLogout}>ログアウト</a>
      </div>
    </div>
  )
}

export default MenuBox
