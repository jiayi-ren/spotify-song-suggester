import React from 'react';
import SavedList from './SavedList';

const UserPage = props =>{

    const {savedList} = props
    
    return (
        <div>
            <SavedList savedList={savedList}/>
        </div>
    )
}

export default UserPage;