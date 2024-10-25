import styles from 'styles/Header.module.css'
import logo from 'public/favicon1.png'
import Image from 'next/image'

export default function Header({ verMenu }) {
  return (
    <header id="header-principal" className={styles.header}>
      <div className="w-full bg-[#006993] h-[3rem] flex bg-opacity-90">
        <div className="w-14 h-full flex items-center p-2">
          <div className="w-full">
            <Image
              src={logo}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Logo"
            />
          </div>
        </div>
        <div className="h-full flex items-center">
          <p className="text-xl text-white drop-shadow-lg font-semibold font-serif">
            Conectate
          </p>
        </div>
      </div>
    </header>
  )
}
