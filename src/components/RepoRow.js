import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LangCell from './LangCell';
import { Stars, Calendar, CalendarWeek } from 'react-bootstrap-icons';

/**
 * Component for rendering a result repo item
 * @param {*} props 
 */
function RepoRow(props) {
    return <Row className="repoRow" key={props.keyProp}>
        <Col className="repoColName" xs={3}>
            <div title={props.repo.name}>{props.repo.name}</div>
            <a href={props.repo.html_url} target="blank"><div title={props.repo.full_name} className="repoFullName">{props.repo.full_name}</div></a>
        </Col>

        <Col className="repoColMeta" xs={1}>
            <div title="stars"><Stars size={16}></Stars> {props.repo.stars}</div>
            <div title="forks"><img src={process.env.PUBLIC_URL +'/iconfinder_github-fork_83308.png'}></img> {props.repo.forks}</div>
        </Col>


        <Col className="repoColDesc" xs={3}>
            <p title={props.repo.description}>{props.repo.description}</p>
        </Col>

        <LangCell language={props.repo.language} langUrl={props.repo.languages_url}></LangCell>

        <Col className="repoColDates" xs={2}>
            <div title="created at"><Calendar size={16}></Calendar> {props.repo.created_at.substring(0, 10)}</div>
            <div title="updated at"><CalendarWeek size={16}></CalendarWeek> {props.repo.updated_at.substring(0, 10)}</div>
        </Col>

        <Col className="repoCol" xs={1}>
            By: {props.repo.owner}
        </Col>

        <Col className="repoColImg" xs={1}>
            <a href={props.repo.owner_html_url} target="blank"><img alt={props.repo.owner} src={props.repo.owner_avatar_url} width="30px"></img></a>
        </Col>

    </Row>
}

export default RepoRow;