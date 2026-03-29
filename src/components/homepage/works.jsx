import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="https://companieslogo.com/img/orig/AMPL_BIG-845de968.png"
								alt="amplitude"
								className="work-image"
							/>
							<div className="work-title">Amplitude</div>
							<div className="work-subtitle">
								Software Engineer 2 / Platform Engineer 2
							</div>
							<div className="work-duration">February 2026 - Present</div>
						</div>

						<div className="work">
							<img
								src="https://upload.wikimedia.org/wikipedia/en/4/49/Geotab_Logo.jpg"
								alt="geotab"
								className="work-image"
							/>
							<div className="work-title">Geotab</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">March 2025 - February 2026</div>
						</div>

						<div className="work">
							<img
								src="./fidelity_logo.png"
								alt="fidelity"
								className="work-image"
							/>
							<div className="work-title">Fidelity Investments</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">April 2023 - April 2025</div>
						</div>

						<div className="work">
							<img
								src="https://banner2.cleanpng.com/20180324/hqq/av07qc566.webp"
								alt="apple"
								className="work-image"
							/>
							<div className="work-title">Apple</div>
							<div className="work-subtitle">
								Software Engineer Intern
							</div>
							<div className="work-duration">2022</div>
						</div>

						<div className="work">
							<img
								src="./vmware_logo.jpg"
								alt="vmware"
								className="work-image"
							/>
							<div className="work-title">VMware</div>
							<div className="work-subtitle">
								Software Engineer Intern
							</div>
							<div className="work-duration">2021</div>
						</div>

						<div className="work">
							<img
								src="https://brand.illinois.edu/wp-content/uploads/2024/02/Color-Variation-Orange-Block-I-White-Background.png"
								alt="vmware"
								className="work-image"
							/>
							<div className="work-title">UIUC</div>
							<div className="work-subtitle">
								Computer Science Teaching Assistant
							</div>
							<div className="work-duration">2020</div>
						</div>

						<div className="work">
							<img
								src="https://www.logo.wine/a/logo/Electronic_Arts/Electronic_Arts-Logo.wine.svg"
								alt="vmware"
								className="work-image"
							/>
							<div className="work-title">EA</div>
							<div className="work-subtitle">
								Red Alert2 Map Developer
							</div>
							<div className="work-duration">2006 - 2007</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
