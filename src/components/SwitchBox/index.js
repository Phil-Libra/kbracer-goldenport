import PropTypes from 'prop-types';

const SwitchBox = (
    {
        styles,
        table,
        setTable,
        pagination,
        setPagination
    }
) => {
    const renderBox = () => {
        switch (table) {
            case 'total':
                return (
                    <>
                        <span>总榜</span>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('original')}
                        >
                            原厂榜
                        </div>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('mod')}
                        >
                            改装榜
                        </div>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('vip')}
                        >
                            大V榜
                        </div>
                    </>
                );

            case 'original':
                return (
                    <>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('total')}
                        >
                            总榜
                        </div>
                        <span>原厂榜</span>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('mod')}
                        >
                            改装榜
                        </div>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('vip')}
                        >
                            大V榜
                        </div>
                    </>
                );

            case 'mod':
                return (
                    <>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('total')}
                        >
                            总榜
                        </div>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('original')}
                        >
                            原厂榜
                        </div>
                        <span>改装榜</span>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('vip')}
                        >
                            大V榜
                        </div>
                    </>
                );

            case 'vip':
                return (
                    <>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('total')}
                        >
                            总榜
                        </div>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('original')}
                        >
                            原厂榜
                        </div>
                        <div
                            className={styles.switch}
                            onClick={() => setTable('mod')}
                        >
                            改装榜
                        </div>
                        <span>大V榜</span>
                    </>
                );

            default:
                throw new Error('没有表格切换选项被渲染');
        }
    };

    return (
        <div className={styles.switchBox}>
            <div className={styles.switchButtons}>
                {renderBox()}
            </div>

            <div
                className={styles.pagination}
                onClick={() => setPagination((prevState) => !prevState)}
            >
                <span>{pagination ? '关闭分页' : '开启分页'}</span>
            </div>
        </div>
    )
};


export default SwitchBox;

SwitchBox.propTypes = {
    styles: PropTypes.object,
    table: PropTypes.string.isRequired,
    setTable: PropTypes.func.isRequired,
    pagination: PropTypes.bool,
    setPagination: PropTypes.func
};