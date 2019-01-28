import React from 'react'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import * as ArticlesModel from '../model/articles';

export default class extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            modal: {
                open: false,
                index: null,
                title: '',
                content: '',
                errors: []
            },
        };

        ArticlesModel.all().then((articles) => {
            this.setState({ articles });
        });

        this.inpTitle = React.createRef();
        this.inpContent = React.createRef();

    }

    async onDelete(ind){

        let id = this.state.articles[ind].id;

        let res = await ArticlesModel.remove(id);

        if (res === true){
            let articles = [...this.state.articles];
            articles.splice(ind, 1);
            this.setState({articles});
        }
    }

    onSubmit(){

        let article = {
            title: this.inpTitle.current.value,
            content: this.inpContent.current.value
        }

        if (this.state.modal.index === null) {
            this.OnAdd(article);
        }
        else {
            this.onEdit(this.state.modal.index, article);
        }

    }

    async OnAdd(article) {
        let response = await ArticlesModel.add(article);

        if (response.res === true) {
            this.onClose();
            let article = await ArticlesModel.one(response.id);
            let articles = [...this.state.articles];
            articles.push(article);
            this.setState({articles});
        }
        else{
            let modal = Object.assign({}, this.state.modal);
            modal.errors = response.errors;
            this.setState({modal});
        }
    }

    async onEdit(index, article){
        let id = this.state.articles[index].id;

        let response = await ArticlesModel.edit(id, article);

        if (response.res === true) {
            this.onClose();
            let article = await ArticlesModel.one(id);
            let articles = [...this.state.articles];
            articles[index] = article;
            this.setState({articles});
        }
        else{
            let modal = Object.assign({}, this.state.modal);
            modal.errors = response.errors;
            this.setState({modal});
        }
    }

    onOpen(index = null, title = '', content = '', errors =[]){

        let modal = Object.assign({}, this.state.modal, {open: true, index, title, content, errors});
        this.setState({modal});
    }

    onClose(){
        let modal = Object.assign({}, this.state.modal);
        modal.open =false;

        this.setState({modal});
    }

    render(){

        const  { articles } = this.state;

        let article = articles.map((item, i) => {
            return (
                    <Grid item sm={3} key={item.id}>
                        <Card>
                            <CardHeader title={item.title}></CardHeader>
                            <CardContent>{item.content}</CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={() => this.onOpen(i, item.title, item.content)}>Edit</Button>
                                <Button variant="contained" onClick={() => this.onDelete(i)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>);
        });

        let errors = this.state.modal.errors.map((item, i) => {
            return(
                <p key={i}>{item}</p>
            );
        });

        return (<div>
                <Grid container spacing={32}>

                        {article}

                </Grid>
                    <hr/>
                    <Button color="primary" onClick={() => this.onOpen()}>Add</Button>

                    <Dialog open={this.state.modal.open} onClose={() => this.onClose()}>
                        <DialogTitle>Добавление новой статьи</DialogTitle>
                        <form>
                            <DialogContent>
                                    <TextField
                                        id="title"
                                        defaultValue={this.state.modal.title}
                                        placeholder="Title"
                                        fullWidth
                                        variant="outlined"
                                        inputRef={this.inpTitle}
                                    />
                                    <TextField
                                        id="content"
                                        defaultValue={this.state.modal.content}
                                        multiline
                                        rowsMax="5"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Content"
                                        inputRef={this.inpContent}
                                    />

                                {errors}

                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={() => this.onSubmit()} >Ok</Button>
                                <Button onClick={() => this.onClose()}>Cancel</Button>
                            </DialogActions>
                        </form>

                    </Dialog>
                </div>

        );
    }
}