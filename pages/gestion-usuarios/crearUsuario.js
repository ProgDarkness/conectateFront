import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useState, useRef } from 'react'
import { Button } from 'primereact/button'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import { motion } from 'framer-motion'
import CryptoJS from 'crypto-js'
import GQLLogin from 'graphql/login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Password } from 'primereact/password'

function CrearUsuario({ visibled, setVisibled, refresUser }) {
  const toast = useRef(null)
  const [state, setState] = useState({
    nombre: '',
    primerApellido: '',
    segundoNombre: '',
    segundoApellido: '',
    cedula: '',
    gerencia: '',
    usuario: '',
    correo: '',
    clave: ''
  })
  const [confirClave, setConfirClave] = useState('')

  function animation(input) {
    // eslint-disable-next-line prefer-const
    let container = {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: [0, 1],
        transition: { delay: 0.02 }
      }
    }

    for (let i = 0; i < input; i++) {
      container.visible.transition.delay += 0.3
    }

    return container
  }

  const header = (
    <motion.div
      variants={animation(1)}
      initial="hidden"
      animate="visible"
      style={{ fontSize: '27px', fontWeight: '600', textAlign: 'center' }}
      className="bg-[#b1b0b0] text-white w-80 redondeo-xl"
    >
      <h1>CREAR USUARIO</h1>
    </motion.div>
  )

  const insertNewUser = (variables) => {
    return (
      request(
        process.env.NEXT_PUBLIC_URL_BACKEND,
        GQLLogin.INSERT_NEW_USER,
        variables
      ) || null
    )
  }

  const validarContraseña = () => {
    if (confirClave === state.clave) {
      const inputNewUser = {
        pri_nombre: state.nombre,
        seg_nombre: state.segundoNombre,
        pri_apellido: state.primerApellido,
        seg_apellido: state.segundoApellido,
        gerencia: state.gerencia,
        cedula_usr: state.cedula,
        usuario: state.usuario,
        correo: state.correo,
        clave: CryptoJS.AES.encrypt(
          state.clave,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString()
      }

      console.log('asdsdsadas')

      insertNewUser({ inputNewUser }).then(
        ({ inserNewUser: { status, message, type } }) => {
          refresUser()
          toast.current.show({
            severity: type,
            summary: 'Atención',
            detail: message,
            life: 4000
          })
          setState({
            nombre: '',
            primerApellido: '',
            segundoNombre: '',
            segundoApellido: '',
            cedula: '',
            gerencia: '',
            usuario: '',
            correo: '',
            clave: ''
          })
          setConfirClave('')
        }
      )
    } else {
      setConfirClave('')
      toast.current.show({
        severity: 'warn',
        summary: 'Info',
        detail: 'La confirmacion no coincide con la contraseña',
        life: 4000
      })
    }
  }

  const onEnterR = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      document.querySelector('#btn-registrar').click()
    }
  }

  return (
    <Dialog
      header={header}
      visible={visibled}
      className="w-full xl:w-[55vw]"
      onHide={() => setVisibled(false)}
      resizable={false}
      draggable={false}
      contentClassName="redondeo-dialog-content"
      headerClassName="redondeo-dialog-header"
      position="top-left"
    >
      <Toast ref={toast} />
      <div className="grid grid-cols-3 gap-4">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="cedula"
            value={state.cedula}
            maxLength={8}
            autoComplete="off"
            placeholder="Cedula"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, cedula: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="nombre"
            value={state.nombre}
            autoComplete="off"
            placeholder="Nombre"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, nombre: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="segundo_nombre"
            value={state.segundoNombre}
            autoComplete="off"
            placeholder="Segundo Nombre"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, segundoNombre: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="usuario"
            value={state.usuario}
            autoComplete="off"
            placeholder="Usuario"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, usuario: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="primer_apellido"
            value={state.primerApellido}
            autoComplete="off"
            placeholder="Apellido"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, primerApellido: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="segundo_apellido"
            value={state.segundoApellido}
            autoComplete="off"
            placeholder="Segundo Apellido"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, segundoApellido: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="gerencia"
            value={state.gerencia}
            autoComplete="off"
            placeholder="Gerencia"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, gerencia: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <InputText
            id="correo"
            value={state.correo}
            autoComplete="off"
            placeholder="Correo"
            className="rounded-xl"
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, correo: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faKey} />
          </span>
          <Password
            id="password"
            placeholder="Contraseña"
            className="redondeo-input-addon"
            toggleMask
            value={state.clave}
            feedback={false}
            onChange={({ target: { value } }) =>
              setState((ps) => ({ ...ps, clave: value }))
            }
          />
        </div>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon span-sesion">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <Password
            id="password"
            toggleMask
            placeholder="Confirmar Contraseña"
            className="redondeo-input-addon"
            value={confirClave}
            feedback={false}
            onKeyPress={onEnterR}
            onChange={(e) => setConfirClave(e.target.value)}
          />
        </div>
        <div className="flex justify-center col-span-3">
          <Button
            id="btn-registrar"
            icon="pi pi-sign-in"
            className="rounded-xl w-40 h-6"
            label="Registrate"
            disabled={
              state.correo === null ||
              state.clave === null ||
              state.clave?.length < 6 ||
              confirClave === null ||
              confirClave?.length < 6
            }
            onClick={validarContraseña}
          />
        </div>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .nacionalidad .p-button {
          min-width: 1rem !important;
        }
        .p-button:disabled {
          background: #3f51b5 !important;
          color: #ffffff !important;
          opacity: 1;
        }
        .nacionalidad .p-button.p-highlight {
          background: #3f51b5 !important;
          border-color: #3f51b5 !important;
          color: white !important;
        }
        .p-disabled .p-component:disabled {
          opacity: 0.5;
        }
        #DropDown .p-disabled,
        .p-component:disabled {
          opacity: 1;
        }
        .p-selectbutton .p-button.p-highlight {
          background: #dbcdae;
          border-color: #dbcdae;
          color: white;
        }
        button:not(button):not(a):not(.p-disabled):active {
          background: #dbcdae;
          border-color: #dbcdae;
          color: white;
        }
        .p-selectbutton .p-button:focus.p-highlight {
          background: #dbcdae;
          border-color: #dbcdae;
          color: white;
        }
        .redondeo-dialog-header {
          border-top-left-radius: 0.75rem !important;
          border-top-right-radius: 0px !important;
        }
        .redondeo-dialog-content {
          border-bottom-left-radius: 0.75rem !important;
          border-bottom-right-radius: 0.75rem !important;
        }
      `}</style>
    </Dialog>
  )
}

export default CrearUsuario
