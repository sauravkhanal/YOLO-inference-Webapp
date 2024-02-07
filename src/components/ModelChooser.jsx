import React, { useEffect, useState } from 'react'
import { getModelsEndpoint } from '../resources/config'
import CachedIcon from '@mui/icons-material/Cached';

function ModelChooser({ onSelectModel }) {

    const [modelList, setModelList] = useState([])
    const [reload, toggleReload] = useState(false)
    const [selectedModel, setSelectedModel] = useState("");

    useEffect(() => {
        async function getModels() {
            try {
                const result = await fetch(getModelsEndpoint)
                const response = await result.json()
                // console.log(response.message)
                setModelList(response.message)

                if (!selectedModel && response.message.length > 0) {
                    setSelectedModel(response.message[0]);
                    onSelectModel(response.message[0]);
                }
            }
            catch (error) {
                console.log("Couldn't fetch models list ", error)
            }
        }

        getModels()
    }, [reload])

    function handleSelect(event) {
        const selectedValue = event.target.value;
        setSelectedModel(selectedValue);
        onSelectModel(selectedValue);
    }



    return (
        <div style={{ display: 'flex', gap: 10 }}>
            <label htmlFor="model">Choose Model </label>
            <select id='model' onChange={handleSelect}>
                {
                    modelList.map((model, index) => <option key={index} value={model}>{model}</option>)
                }
            </select>
            <div onClick={() => toggleReload(val => !val)}>
                <CachedIcon />
            </div>
        </div>
    )
}

export default ModelChooser