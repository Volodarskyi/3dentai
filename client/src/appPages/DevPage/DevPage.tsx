"use client";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { apiClient } from "@/api/apiClient"; // путь подкорректируй, если отличается

import "./DevPage.Styles.scss";

const DevPageComponent: FC = () => {
    const [currentServer, setCurrentSever] = useState('');
    const [currentAI, setCurrentAI] = useState('');

    useEffect(() => {
        const fetchServerVersion = async () => {
            try {
                const data = await apiClient.get('/api/system/version');
                console.log('SERVER VERSION:', data);
                setCurrentSever(data.data.serverVersion
                    || 'unknown');

                setCurrentAI(data.data.aiVersion
                    || 'unknown');

            } catch (error) {
                console.error('Failed to fetch server version:', error);
                setCurrentSever('error');
            }
        };

        fetchServerVersion();
    }, []);

    return (
        <div className="dev">
            <h1 className="dev__title">Dev</h1>
            <div>client: 0.3.13</div>
            <div>server: {currentServer}</div>
            <div>AI: {currentAI}</div>
        </div>
    );
};

export const DevPage = observer(DevPageComponent);
