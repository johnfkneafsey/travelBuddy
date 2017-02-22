import React from 'react';
import {SERVER_ROOT} from '../config';

export default function LoginPage() {
    return (
        <div className="center">
            <h3 className="center">Lasting Latin</h3>
            <h5 className="center"><i>Learn latin using spaced repetition now!</i></h5>
            <button><a className="center" href={`${SERVER_ROOT}/auth/google`}>Sign Up/Log In</a>
            </button>
        </div>
    )}



