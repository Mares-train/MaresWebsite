import React, { useState } from 'react';
import { TextField, Button, Typography, Rating } from '@mui/material';
import { useParams } from 'react-router';
import { useEvaluationContext } from '../../../contexts/EvaluationContext';

const CommentBox = () => {
    const [comment, setComment] = useState('');
    const [numOfStars, setRating] = useState(0);
    const { companyId } = useParams();
    const { addComment } = useEvaluationContext()
    // Function to handle submission of the comment
    const handleSubmit = () => {
        // Here you can submit the comment and rating to the database
        let body = {
            comment,
            numOfStars,
            companyId
        }
        addComment(body)
        setComment('');
        setRating(0);
    };

    return (
        <>
            <div className="container">
                <div className="row w-100 my-5">
                    <div className="col-6 mx-auto">
                        <Typography variant="h6" gutterBottom fontFamily='Tajawal, sans-serif'>
                            ضع تعليقك:
                        </Typography>

                        <TextField
                            label={" صف تجربتك خلال التدريب"}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ marginBottom: '20px' }}
                            InputProps={{ style: { fontFamily: 'Tajawal, sans-serif' } }}
                        />
                        <Typography className='mt-4' variant="subtitle1" gutterBottom fontFamily='Tajawal, sans-serif'>
                            قيم تجربتك
                        </Typography>
                        <Rating
                            name="rating"
                            value={numOfStars}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            style={{ marginBottom: '20px' }}
                        />
                        <br />
                        <Button
                            variant="contained"

                            onClick={handleSubmit}
                            style={{ fontFamily: 'Tajawal, sans-serif', backgroundColor: '#66cdaa', color: 'black' }}
                        >
                            ارسل
                        </Button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default CommentBox;
