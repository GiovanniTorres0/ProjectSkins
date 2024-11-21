import React, { createContext, useContext, useEffect, useState } from 'react'

export type DeviceType = 'mobile' | 'desktop' | 'totem'

interface DeviceContextType {
  deviceType: DeviceType;
  setDeviceType: (type: DeviceType) => void;
  isMobile: boolean;
  isTotem: boolean;
  isDesktop: boolean;
}

const DeviceTypeContext = createContext<DeviceContextType>({
  deviceType: 'desktop',
  setDeviceType: () => {},
  isMobile: false,
  isTotem: false,
  isDesktop: true,
})

export const useDeviceType = () => useContext(DeviceTypeContext)

export const DeviceTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const detectDevice = () => {
      // Detecta se é um totem baseado em parâmetros da URL ou localStorage
      const isTotem = window.localStorage.getItem('deviceType') === 'totem' || 
                     new URLSearchParams(window.location.search).get('device') === 'totem'
      
      if (isTotem) {
        setDeviceType('totem')
        return
      }

      // Detecta se é mobile baseado no tamanho da tela
      if (window.innerWidth <= 768) {
        setDeviceType('mobile')
        return
      }

      setDeviceType('desktop')
    }

    detectDevice()
    window.addEventListener('resize', detectDevice)
    return () => window.removeEventListener('resize', detectDevice)
  }, [])

  const value = {
    deviceType,
    setDeviceType,
    isMobile: deviceType === 'mobile',
    isTotem: deviceType === 'totem',
    isDesktop: deviceType === 'desktop',
  }

  return (
    <DeviceTypeContext.Provider value={value}>
      {children}
    </DeviceTypeContext.Provider>
  )
}