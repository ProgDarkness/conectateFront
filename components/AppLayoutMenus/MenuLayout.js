import { SlideMenu } from 'primereact/slidemenu'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Salir from 'components/salir.js'

function Menu({ items }) {
  const router = useRouter()
  const [itemsMenu, setItemsMenu] = useState()
  const [confirmSalir, setConfirmSalir] = useState(false)
  const [height, setHeight] = useState(0)
  const [sizeText, setSizeText] = useState('14px')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const calculoHeight = window?.screen.height - 555

      if (window?.screen.height > 758) {
        setSizeText('17px')
      } else if (window?.screen.height <= 758) {
        setSizeText('14px')
      }

      setHeight(calculoHeight)
    }
  }, [])

  useEffect(() => {
    const _items = items ? JSON.parse(items) : null

    if (_items !== null) {
      const _itemsMenu = _items.map((item) => {
        return {
          label: item.label,
          icon: item.icon,
          command: eval(item.command),
          style: item.command.includes(router.route)
            ? {
                backgroundColor: '#b1b0b0',
                color: '#000000'
              }
            : { backgroundColor: '#ffffff' }
        }
      })
      _itemsMenu.push({
        label: 'Salir',
        icon: 'pi pi-arrow-left',
        command: () => setConfirmSalir(true)
      })
      setItemsMenu(_itemsMenu)
    }
  }, [items])

  return (
    <>
      {/* 1366 x 657 */}
      <div className="w-full redondeo-xl">
        <SlideMenu
          id="slide-menu"
          style={{ fontSize: `${sizeText}` }}
          className="redondeo-xl w-auto "
          model={itemsMenu}
          viewportHeight={height}
          /* menuWidth={width} */
        />
      </div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-menuitem {
          border-radius: 0.5rem 0rem 0.5rem 0.5rem;
        }
        #ReponseMenu.p-slidemenu .p-menuitem-link {
          padding: 0.35rem;
        }
        #ReponseMenu.p-slidemenu.p-slidemenu-overlay {
          border: 2px solid #2a7e87;
        }
        #ReponseMenu.p-slidemenu .p-slidemenu-backward span {
          vertical-align: middle;
        }
        #slide-menu .p-menuitem * {
          color: inherit !important;
        }
        .p-slidemenu .p-menuitem-link:not(.p-disabled):hover {
          background: #dbcdae;
          border-radius: 0.5rem 0rem 0.5rem 0.5rem;
        }
      `}</style>
      <Salir visible={confirmSalir} setVisible={setConfirmSalir} />
    </>
  )
}

export { Menu }
