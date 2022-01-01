import React, { useCallback, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

import styles from '../../styles/common/layout.module.scss'
import userSlice from '../../redux/slices/user'
import Router from "next/router"

interface Props {
  menu: boolean
  setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuBox = ({ menu, setMenu }: Props) => {
  const dispatch = useDispatch()
  const menuRef = useRef<HTMLDivElement>(null)

  const onLogout = useCallback(() => {
    dispatch(userSlice.actions.logOut())
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
        <a href="/">Edit Profile</a>
        <a onClick={onLogout}>Log Out</a>
      </div>
    </div>
  )  
}

export default MenuBox
