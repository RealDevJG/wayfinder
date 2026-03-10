import React from "react";
import { SnapshotStopReasonEnum } from "../../../../modules/snapshots/domain/snapshotStopReasonEnum";
import Radio from "../../foundational/RadioButtons/Radio";
import RadioGroup from "../../foundational/RadioButtons/RadioGroup";

type SnapshotStopReasonSelectorProps = {
    currentStopReason: SnapshotStopReasonEnum;
    setStopReasonState?: (value: any) => void;
}

const SnapshotStopReasonSelector: React.FC<SnapshotStopReasonSelectorProps> = ({ currentStopReason, setStopReasonState }) => {
    return (
        <RadioGroup onChildPressed={(value) => setStopReasonState?.(value)}>
            {Object.values(SnapshotStopReasonEnum).map((value, index) => (
                <Radio key={index} label={value} selected={currentStopReason === value} />
            ))}
        </RadioGroup>
    );
}

export default SnapshotStopReasonSelector;
