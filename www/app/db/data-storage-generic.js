/*
 * Generagic Storage skeleton
 * @author: skitsanos
 * @version: 1.0.1
*/

const uuidv1 = require('uuid/v1');

class GenericDataStorage
{
    constructor(config)
    {
        this.config = config;
    }

    static logi()
    {
        if (global.log.info === undefined)
        {
            console.log.apply(null, arguments);
        }
        else
        {
            global.log.info.apply(null, arguments);
        }
    }

    static logw()
    {
        if (global.log.warn === undefined)
        {
            console.warn.apply(null, arguments);
        }
        else
        {
            global.log.warn.apply(null, arguments);
        }
    }

    static loge()
    {
        if (global.log.error === undefined)
        {
            console.error.apply(null, arguments);
        }
        else
        {
            global.log.error.apply(null, arguments);
        }
    }

    getUuid()
    {
        return uuidv1();
    }

    version()
    {
    }

    /**
     * Checks the storage
     */
    ping()
    {
        return new Promise((resolve, reject) =>
        {
            resolve(true);
        });
    }

    put(data, callback)
    {
    }

    update(id, data, callback)
    {
    }

    delete(id, callback)
    {
    }

    search(query)
    {
    }
}

module.exports = GenericDataStorage;
