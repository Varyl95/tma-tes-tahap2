'use client'

import 'styles/theme.scss';


export default function DashboardLayout({ children }) {

	return (
		<div>
			<div className="w-full">
				{children}
			</div>
		</div>
	)
}
