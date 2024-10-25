import AppLayout from 'components/AppLayout'
import { Card } from 'primereact/card'
import { Menu } from './MenuLayout'

function AppLayoutMenus({ children, items }) {
  return (
    <AppLayout>
      <div className="flex flex-row w-[95%] lg:h-[89.5%] gap-4 m-auto pb-12">
        <div className="basis-[12rem] hidden xl:flex h-min max-h-[80vh] overflow-auto opacity-90 border-2 border-[#006993] redondeo-xl">
          <Menu items={items} />
        </div>
        <div className="basis-full xl:basis-[90%]">
          <Card className="redondeo-xl h-[83vh] max-h-[83vh] lg:h-full overflow-auto border-2 border-[#006993] opacity-90">
            {children}
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

export { AppLayoutMenus }
