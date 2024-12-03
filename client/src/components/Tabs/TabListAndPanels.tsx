'use client'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'
import { Dispatch, SetStateAction } from 'react'

interface TabListAndPanelsProps {
	labels: string[]
	panels: React.ReactNode[]
	tabValue: number
	setTabValue: Dispatch<SetStateAction<number>>
}

export default function TabListAndPanels({
	labels,
	panels,
	tabValue,
	setTabValue
}: TabListAndPanelsProps) {
	// const [tabValue, setTabValue] = useState(1)

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue)
	}
	return (
		<TabContext value={tabValue}>
			<div className="w-fit">
				<TabList
					onChange={handleTabChange}
					sx={{
						'.MuiTabs-indicator': {
							backgroundColor: '#B95ED4'
						}
					}}
					className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:-z-10 after:h-[2px] after:bg-white"
				>
					{labels.map((label, index) => (
						<Tab
							key={index}
							label={label}
							value={index + 1}
							sx={{
								color: '#ffffff',
								'&.Mui-selected': { color: '#B95ED4' },
								textTransform: 'none',
								fontFamily: 'Inter',
								fontWeight: 600,
								fontSize: '14px'
							}}
						/>
					))}
				</TabList>
			</div>
			{panels.map((panel, index) => (
				<TabPanel key={index} value={index + 1}>
					{panel}
				</TabPanel>
			))}
		</TabContext>
	)
}
