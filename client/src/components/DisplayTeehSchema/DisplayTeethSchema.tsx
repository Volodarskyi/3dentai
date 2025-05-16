"use client";
import React, { FC, useState } from 'react';
import { observer } from "mobx-react-lite";
import Image from "next/image";

import './DisplayTeethSchema.Styles.scss';

const DisplayTeethSchemaComponent = () => {
    const [activeTooth, setActiveTooth] = useState<number>(48);

    const lowerTeeth = [46, 47, 48];
    const upperTeeth = [16, 17, 18];
    const allTeeth = [...upperTeeth, ...lowerTeeth];

    const isLower = activeTooth >= 31;
    const jaw = isLower ? 'lower' : 'upper';

    const jawMap = {
        lower: {
            baseImage: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw.png',
            overlays: {
                46: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-46.png',
                47: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-47.png',
                48: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-48.png',
            }
        },
        upper: {
            baseImage: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-upper-jaw.png',
            overlays: {
                16: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-16.png',
                17: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-17.png',
                18: '/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-18.png',
            }
        }
    };

    const currentJaw = jawMap[jaw];
    // @ts-ignore
    const overlaySrc = currentJaw.overlays[activeTooth];

    const handlePrev = () => {
        const index = allTeeth.indexOf(activeTooth);
        const prevIndex = (index - 1 + allTeeth.length) % allTeeth.length;
        setActiveTooth(allTeeth[prevIndex]);
    };

    const handleNext = () => {
        const index = allTeeth.indexOf(activeTooth);
        const nextIndex = (index + 1) % allTeeth.length;
        setActiveTooth(allTeeth[nextIndex]);
    };

    return (
        <div className="display-teeth-schema">
            <div className="display-teeth-schema__top">
                <div className="display-teeth-schema__top-left">Teeth Schema</div>
                <div className="display-teeth-schema__top-number">{activeTooth}</div>
                <div className="display-teeth-schema__top-right">{jaw === 'upper' ? 'Upper Jaw' : 'Lower Jaw'}</div>
            </div>

            <div className="display-teeth-schema__image">
                <div className="display-teeth-schema__workspace">
                    {/* Base Image */}
                    <Image
                        src={currentJaw.baseImage}
                        alt={`Jaw schema`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        unoptimized
                    />

                    {/* Overlay */}
                    {overlaySrc && (
                        <Image
                            src={overlaySrc}
                            alt={`Tooth ${activeTooth}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                pointerEvents: 'none',
                            }}
                            unoptimized
                        />
                    )}
                </div>
            </div>

            <div className="display-teeth-schema__bottom">
                <button className="display-teeth-schema__bottom-left" onClick={handlePrev}>Prev</button>
                <button className="display-teeth-schema__bottom-right" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export const DisplayTeethSchema = observer(DisplayTeethSchemaComponent);
