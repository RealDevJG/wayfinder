import React from "react";
import { ProjectStatusEnum } from "../../../../modules/projects/domain/projectStatusEnum";
import Radio from "../../foundational/RadioButtons/Radio";
import RadioGroup from "../../foundational/RadioButtons/RadioGroup";

type ProjectStatusSelectorProps = {
    currentStatus: ProjectStatusEnum;
    setStatusState?: (value: any) => void;
}

const ProjectStatusSelector: React.FC<ProjectStatusSelectorProps> = ({ currentStatus, setStatusState }) => {
    return (
        <RadioGroup onChildPressed={(value) => setStatusState?.(value)}>
            {Object.values(ProjectStatusEnum).map((value, index) => (
                <Radio key={index} label={value} selected={currentStatus === value} />
            ))}
        </RadioGroup>
    );
}

export default ProjectStatusSelector;
