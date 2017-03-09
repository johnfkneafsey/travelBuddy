import React from 'react';
import {SERVER_ROOT} from '../config';

export default function LoginPage() {
    return (
        <div className="center">
            <h1 className="center spacedtop biggest">World Traveler</h1>
            <h3 className="center spaced big">A language companion for adventurers</h3>
            <button className="btn daisy spacedsmall "><a className="center" href={`${SERVER_ROOT}/auth/google`}>Sign Up/Log In</a>
            </button>
        </div>
    )}



