import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import {flattenTree,setValue} from './utils';

class FormSelectComponent extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        className: PropTypes.string,
        inlineSearchInput: PropTypes.bool,
        size: PropTypes.string,
        keepTreeOnSearch: PropTypes.bool,
        keepChildrenOnSearch: PropTypes.bool,
        isValid: PropTypes.bool,
        isInvalid: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        mode: PropTypes.oneOf(['multiSelect', 'simpleSelect', 'radioSelect', 'hierarchical']),
        data: PropTypes.array,
        placeholder:PropTypes.string

    };
    constructor(props) {
        super(props);
        const { data, map } = flattenTree(JSON.parse(JSON.stringify(props.data || [])));
        setValue(props.value, map, props.mode);
        this.state = {
            //dataCombineWithValue:data,
            data: data,//JSON.parse(JSON.stringify(data)),
            innerValue: props.value,
            map: map,
            prevProps: props,
            timeRender:new Date(),
            timeBlur:new Date(),
        };
        this.subscriptions = {};
    }
    componentDidMount(){

        
    }
    static getDerivedStateFromProps(props, state) {
        let prevProps = { ...state.prevProps };
        let nextState = null;
        if (props.value !== prevProps.value) {
            nextState = nextState || {};
            prevProps.value = props.value;
            if (props.value !== state.innerValue) {           
                nextState.innerValue=props.value; // cap nhat lai innerValue
                //nextState.data=JSON.parse(JSON.stringify(state.dataCombineWithValue));// gan lai data de combine lai
                nextState.timeRender= new Date(); // render lai
            }           
        }
        if (prevProps.data !== props.data) {
            nextState = nextState || {};
            prevProps.data = props.data;
            // khoi tao lai value moi
            const {data,map} = flattenTree(JSON.parse(JSON.stringify(props.data || [])));// khoi tao lai data map moi
            setValue(state.innerValue,map,prevProps.mode,true); //cap nhat check theo value
            nextState.data=data;//JSON.parse(JSON.stringify(data));// gan lai data de hien thi
            //nextState.dataCombineWithValue=data;
            nextState.map=map;
            nextState.timeRender= new Date(); // render lai        
        }
        if (prevProps.isInvalid !== props.isInvalid) {
            nextState = nextState || {};
            prevProps.isInvalid = props.isInvalid;
            //nextState.data=JSON.parse(JSON.stringify(state.dataCombineWithValue));// gan lai data de combine lai     
            nextState.timeRender= new Date(); // render lai
        }      
        if (nextState) {
            nextState.prevProps = prevProps;
        }
        return nextState;

    }
    shouldComponentUpdate(nextProps, nextState) {

        if(nextState.timeRender!== this.state.timeRender){
            return true;
        }
        return false;
    }
    componentWillUnmount() {
        Object.keys(this.subscriptions).forEach((key) => {
            this.subscriptions[key].unsubscribe();
        });
    }

    onChange(selectedNodes) {
        let res = selectedNodes.map(x => {
            return x.value;
        });
        let value = null;
        if (['radioSelect', 'simpleSelect'].includes(this.props.mode)) {
            value = res[0] || null;
        } else {

            value = res || null;
        }
        if(this.state.innerValue!==value){
            setValue(this.state.innerValue,this.state.map,this.props.mode,false);
            setValue(value,this.state.map,this.props.mode,true);
        }    
        this.setState({ innerValue: value }, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    persist: () => {},
                    target: {
                        type: 'change',
                        id: this.props.id || null,
                        name: this.props.name,
                        value: value
                    }
                });
            }
            
        });

    }
    handleBlur() {
        // this.setState({timeBlur:new Date()});
    }

    render() {
        const {
            
            className,
            isValid,
            isInvalid,
            size,
            keepTreeOnSearch,
            keepChildrenOnSearch,
            placeholder,
            // eslint-disable-next-line no-unused-vars
            data,
            // eslint-disable-next-line no-unused-vars
            inlineSearchInput,
            // eslint-disable-next-line no-unused-vars
            onChange,
            // eslint-disable-next-line no-unused-vars
            onBlur,
            // eslint-disable-next-line no-unused-vars
            value,
            
            ...props } = this.props;
        return (
            <React.StrictMode>
                <DropdownTreeSelect
                    data={this.state.data}
                    className={classNames(
                        className,
                        'form-select form-control',
                        size ? `form-control-${size}` : '',
                        isValid && 'is-valid',
                        isInvalid && 'is-invalid',
                    )}
                    inlineSearchInput={true}
                    texts={
                        {
                            placeholder: placeholder||'Chọn...',  // optional: The text to display as placeholder on the search box. Defaults to `Choose...`
                            noMatches: 'không tìm thấy!',    // optional: The text to display when the search does not find results in the content list. Defaults to `No matches found`
                        }
                    }
                    keepTreeOnSearch={keepTreeOnSearch || true}
                    keepChildrenOnSearch={keepChildrenOnSearch || true}
                    onChange={(currentNode, selectedNodes) => { this.onChange(selectedNodes,currentNode);}}
                    onBlur={this.handleBlur.bind(this)}
                    {...props}
                ></DropdownTreeSelect >
            </React.StrictMode>
        );
    }
}

export { FormSelectComponent };
