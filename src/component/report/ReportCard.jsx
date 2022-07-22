import React from 'react';
import AppCard from '../../component/common/Card';
import { Button, CardActions } from '@mui/material';

const ReportCard = (props) => {
    return (
        <AppCard key={`${props.item.id}__keey`}>
            <img src={props.item.child_image} alt={props.item.child_image} style={{width: '100%', height: '250px', objectFit:'cover'}} />
            <CardActions>

                <Button size="small" color="primary" onClick={() => { }}>
                    Doly maglumat
                </Button>

            </CardActions>
        </AppCard>
    )
}

export default ReportCard
