import React from "react";
import { ProjectStatus } from "../../../../common/types/projectStatus";
import Radio from "../../foundational/RadioButtons/Radio";
import RadioGroup from "../../foundational/RadioButtons/RadioGroup";

interface ProjectStatusSelectorProps {
    currentStatus: ProjectStatus;
    setStatusState?: (value: any) => void;
}

const ProjectStatusSelector: React.FC<ProjectStatusSelectorProps> = ({ currentStatus, setStatusState }) => {
    return (
        <RadioGroup onChildPressed={(value) => setStatusState?.(value)}>
            {Object.values(ProjectStatus).map((value, index) => (
                <Radio key={index} label={value} selected={currentStatus === value} />
            ))}
        </RadioGroup>
    );
}

export default ProjectStatusSelector;
