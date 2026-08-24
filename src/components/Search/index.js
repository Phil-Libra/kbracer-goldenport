import { Input, Select, Radio } from 'antd';
import PropTypes from 'prop-types';

import styles from '../../App.module.css';

const Search = (
    {
        filter,
        setFilter,
        highlight,
        setHighlight,
        table
    }
) => {
    const { Option } = Select;

    return (
        <div className={styles.search}>
            <div className={styles.searchGroup}>
                <Input
                    addonBefore="搜索："
                    placeholder="车型关键字"
                    style={{
                        minWidth: '200px'
                    }}
                    onChange={(e) => setFilter(() => (
                        {
                            ...filter,
                            name: e.target.value
                        }
                    ))}
                    allowClear
                />
                <div className={styles.selectBox}>
                    <Select
                        defaultValue={'all'}
                        style={{
                            minWidth: '115px'
                        }}
                        onChange={(val) => setFilter(() => (
                            {
                                ...filter,
                                key: val
                            }
                        ))}
                    >
                        <Option value="all">全部车型</Option>
                        <Option value="fuel">只看油车</Option>
                        <Option value="ev">只看电车</Option>
                    </Select>
                    <Select
                        defaultValue={'all'}
                        style={{
                            paddingLeft: '10px',
                            minWidth: '115px'
                        }}
                        onChange={(val) => setFilter(() => (
                            {
                                ...filter,
                                class: val
                            }
                        ))}
                    >
                        <Option value="all">车辆级别</Option>
                        <Option value="S">跑车</Option>
                        <Option value="A0">A0</Option>
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="C">C</Option>
                        <Option value="D">D</Option>
                        <Option value="SUV">SUV</Option>
                        <Option value="MPV">MPV</Option>
                    </Select>
                    <Select
                        defaultValue={'all'}
                        style={{
                            paddingLeft: '10px',
                            minWidth: '115px'
                        }}
                        onChange={(val) => setFilter(() => (
                            {
                                ...filter,
                                drive: val
                            }
                        ))}
                    >
                        <Option value="all">驱动形式</Option>
                        <Option value="F">前驱</Option>
                        <Option value="R">后驱</Option>
                        <Option value="4">四驱</Option>
                    </Select>
                </div>
            </div>
            {
                table !== 'vip'
                && <Radio.Group
                    style={{
                        marginTop: '15px'
                    }}
                    buttonStyle='solid'
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                >
                    <Radio.Button value={'all'}>全部</Radio.Button>
                    <Radio.Button value={'brz'}>新老BRZ进化</Radio.Button>
                    <Radio.Button value={'fourCars'}>4车进化</Radio.Button>
                    <Radio.Button value={'fa1'}>八代思域进化</Radio.Button>
                </Radio.Group>
            }
        </div >
    )
};

export default Search;

Search.propTypes = {
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    highlight: PropTypes.string.isRequired,
    setHighlight: PropTypes.func.isRequired,
    table: PropTypes.string.isRequired
};