import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"
import Cookies from "js-cookie"

type VisibleType = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  activeContent: number
  setActiveContent: React.Dispatch<React.SetStateAction<number>>
}

export default function SideBar({
  visible,
  setVisible,
  activeContent,
  setActiveContent,
}: VisibleType) {
  const handleActiveContent = (contentNum: number) => {
    setVisible(false)
    setActiveContent(contentNum)
  }

  const username = Cookies.get("username")

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        content={({ closeIconRef, hide }) => (
          <div className="min-h-screen flex relative lg:static surface-ground">
            <div
              id="app-sidebar-2"
              // className="surface-section h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
              className="surface-section h-screen lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
              style={{ width: "100%" }}
            >
              <div className="flex flex-column h-full">
                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                  <span className="inline-flex align-items-center gap-2">
                    <span className="font-semibold text-2xl text-primary">
                      Inventory
                    </span>
                  </span>
                  <span>
                    <Button
                      type="button"
                      onClick={(e) => hide(e)}
                      icon="pi pi-times"
                      rounded
                      outlined
                      className="h-2rem w-2rem"
                    ></Button>
                  </span>
                </div>

                {/* SIDEBAR CONTENT  */}
                <div className="overflow-y-auto">
                  <ul className="list-none p-3 m-0">
                    <li>
                      <ul className="list-none p-0 m-0 overflow-hidden">
                        <li
                          onClick={() => handleActiveContent(0)}
                          className="flex space-between"
                        >
                          <a
                            className={`p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 ${
                              activeContent === 0
                                ? "bg-blue-100"
                                : "hover:surface-100"
                            } transition-duration-150 transition-colors w-full`}
                          >
                            <i className="pi pi-briefcase mr-2"></i>
                            <span className="font-medium">Assets</span>
                          </a>
                        </li>
                        <li
                          onClick={() => handleActiveContent(1)}
                          className={`${activeContent === 1 && "bg-blue-100"}`}
                        >
                          <a
                            className={`p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 ${
                              activeContent === 1
                                ? "bg-blue-100"
                                : "hover:surface-100"
                            } transition-duration-150 transition-colors w-full`}
                          >
                            <i className="pi pi-shopping-cart mr-2"></i>
                            <span className="font-medium">Pembelian</span>
                          </a>
                        </li>
                        <li
                          onClick={() => handleActiveContent(2)}
                          className={`${activeContent === 2 && "bg-blue-100"}`}
                        >
                          <a
                            className={`p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 ${
                              activeContent === 2
                                ? "bg-blue-100"
                                : "hover:surface-100"
                            } transition-duration-150 transition-colors w-full`}
                          >
                            <i className="pi pi-book mr-2"></i>
                            <span className="font-medium">Catatan</span>
                          </a>
                        </li>
                        <li
                          onClick={() => handleActiveContent(3)}
                          className={`${activeContent === 3 && "bg-blue-100"}`}
                        >
                          <a
                            className={`p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 ${
                              activeContent === 3
                                ? "bg-blue-100"
                                : "hover:surface-100"
                            } transition-duration-150 transition-colors w-full`}
                          >
                            <i className="pi pi-box mr-2"></i>
                            <span className="font-medium">Kartu Stok</span>
                          </a>
                        </li>
                        <li
                          onClick={() => handleActiveContent(4)}
                          className="flex space-between"
                        >
                          <a
                            className={`p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 ${
                              activeContent === 4
                                ? "bg-blue-100"
                                : "hover:surface-100"
                            } transition-duration-150 transition-colors w-full`}
                          >
                            <i className="pi pi-exclamation-circle mr-2"></i>
                            <span className="font-medium">Keluhan</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                  <div className="flex align-items-center justify-content-between m-3">
                    <div className="flex align-items-center">
                      <Avatar
                        image="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
                        shape="circle"
                      />
                      <span className="font-bold ml-2">{username}</span>
                    </div>
                    <Button
                      icon="pi pi-sign-out"
                      rounded
                      text
                      severity="danger"
                      aria-label="Cancel"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      ></Sidebar>
    </div>
  )
}
