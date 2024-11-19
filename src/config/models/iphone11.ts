import { PhoneModel } from '../../types';

export const iphone11: PhoneModel = {
  id: 'iphone11',
  name: 'iPhone 11',
  dimensions: {
    width: 280,
    height: 560
  },
  images: {
    preview: 'https://previews.dropbox.com/p/thumb/ACfPbouqzIOOVsQZNO5m-lqoXYtQ9JJAJXoEN8IO3rwETQTN9FMBu0cjVSyKjY4kLe3Ff99jusQt8L0p4CFcnhoKDrkwDsxNAAPH7_DN5Yya2AQpszoXsoZISfr3Z3tVcP1Pr9AHsynMmuCTtmCk1MpqtYlrrBqiMCeK1xYaUI2tCzPI-78bQA_M4i4V85-tAdZ_GLL3FpUPGCIyn_BKArNpNeTLvRIaRbBGhfLRFjgCZUvOPsJEYBjvk5HHBC_dXoxVCWshOSF4s5vZRCOM17zSj6B4fJ_ZmQslSydy3RA7gk1k9D28dvuhZ_1Uy9DavY6gH2pHNBywa13HmsiTNPd0/p.png?is_prewarmed=true',
    border: 'https://previews.dropbox.com/p/thumb/ACfsY85GunIrl0mcpsPWfvLotBauX4Bd9H0h15TXdmMyU-M9tux0Db-tMPYjO27dyQ1yZjMA4K_Z7TbBHxdxnxNE3xxMUfFDI55_mwRIQYlqUOJ1xTd9gYYv1s6Pu9RoVcayGiyjGnyGv7SbWtY65S22KomUVLgiQb1wY-3FlOzrUMLqi6lcJE65cxHiUwxKuio9MhsG0hdvJyO7cFEzdPNHWysgp4Jim6ZZBjKdLnujIPLEq3LozLtQZaUPjXZL58x0KQTw_vxKx0WDh-PFv7zVwAAkWW9cmvfSIQB96Rp9qfavPiiwrTVFaT-DO45GjHE7Q-bQbnXsJ40Bt6P_1oP5/p.png?is_prewarmed=true'
  },
  template: {
    printableArea: {
      top: 8,
      bottom: 8,
      left: 4,
      right: 4
    },
    camera: {
      type: 'square',
      position: {
        top: 3,
        right: 3,
        width: 29,
        height: 29
      }
    },
    corners: {
      radius: 40
    }
  }
};