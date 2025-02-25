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
								src="./fidelity_logo.png"
								alt="fidelity"
								className="work-image"
							/>
							<div className="work-title">Fidelity Investments</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">April 2023 - Present</div>
						</div>

						<div className="work">
							<img
								src="./apple_logo.svg"
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
					</div>
				}
			/>
		</div>
	);
};

export default Works;
